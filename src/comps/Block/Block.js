import React from "react";

const Block = (props) => {
  return (
    <div className="block" style={{ animationDelay: `${props.delay}s` }}></div>
  );
};

export default Block;
