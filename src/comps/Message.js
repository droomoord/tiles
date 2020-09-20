import React from "react";

const Message = (props) => {
  return (
    <div className="message" style={{ backgroundColor: props.color }}>
      {props.text}
    </div>
  );
};

export default Message;
