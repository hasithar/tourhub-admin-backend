import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
});

const BlockMap = (props) => {
  const { title = "", coordinates, pointName } = props;

  const lat = coordinates[1];
  const lng = coordinates[0];

  return (
    <div className="content-block content-block--features">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>

        <div className="mt-2">
          {coordinates?.length > 0 && (
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              /> */}
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}"
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                ext="png"
                minZoom={0}
                maxZoom={20}
              />
              <Marker position={[lat, lng]} icon={mapIcon}>
                {pointName && <Popup>{pointName}</Popup>}
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockMap;
