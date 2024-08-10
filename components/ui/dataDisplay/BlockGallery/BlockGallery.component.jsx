import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";

// import slides from "@/data/slides";

const BlockGallery = (props) => {
  const { title = "", images = [], name } = props;

  return (
    <div className="content-block content-block--features">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>

        {images?.length > 0 ? (
          <div className="mt-2">
            <Gallery images={images} name={name} />
          </div>
        ) : (
          <p className="mt-2">No {title} available</p>
        )}
      </div>
    </div>
  );
};

export default BlockGallery;

const Gallery = ({ images, name }) => {
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState([]);

  // get sample images during development
  useEffect(() => {
    const fetchImages = async (query) => {
      const accessKey = "N15zAjHue0Q29R1ILINnk5PfFAy2CokscUERoUTtRko"; // Replace with your Unsplash API key
      const url = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=3&client_id=${accessKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        setSlides(
          data.results.map((img) => {
            return {
              src: img.urls.regular,
              height: img.height,
              width: img.width,
            };
          }),
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    images?.length > 0 && fetchImages(name);
  }, [images, name]);

  return (
    <>
      <RowsPhotoAlbum
        photos={slides}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
};
