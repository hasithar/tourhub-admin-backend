import React from "react";

const BlockDescription = (props) => {
  const { title = "", description = "" } = props;

  return (
    <div className="content-block content-block--description">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default BlockDescription;
