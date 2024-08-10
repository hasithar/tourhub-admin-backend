import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const BlockFeatures = (props) => {
  const { title = "", features = [] } = props;

  return (
    <div className="content-block content-block--features">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>

        {features?.length > 0 ? (
          <ul className="mt-2 flex flex-row flex-wrap gap-4">
            {features.map((feature) => (
              <li key={feature?.name} className="">
                <span className="block font-normal">
                  <CheckOutlinedIcon sx={{ fontSize: "0.875rem" }} />{" "}
                  {feature?.name}{" "}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">No {title} available</p>
        )}
      </div>
    </div>
  );
};

export default BlockFeatures;
