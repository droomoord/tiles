import React, { useState, useEffect } from "react";
import Block from "../Block/Block";

const Images = (props) => {
  console.log("IMAGES RENDER!");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    const blockQuantity = [];
    for (let i = 0; i < 16; i++) {
      blockQuantity.push(i);
    }
    const delayTimes = [...blockQuantity];

    function receiveUniqueDelayTime() {
      return delayTimes.splice(
        Math.floor(Math.random() * delayTimes.length),
        1
      )[0];
    }
    setBlocks(
      <div className="blocks">
        {blockQuantity.map((q) => (
          <Block key={q} delay={receiveUniqueDelayTime()} />
        ))}
      </div>
    );
  }, []);

  function init() {
    setImageLoaded(true);
  }

  return props.image ? (
    <React.Fragment>
      <div
        className={["loader", imageLoaded ? "hidden" : "visible"].join(" ")}
      ></div>
      <img
        className={imageLoaded ? "visible" : "hidden"}
        src={props.image.urls.full}
        alt=""
        onLoad={init}
      />
      {blocks}
      <small className="user">
        <div>
          <a
            href={props.image.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            View photo @ Unsplash.com
          </a>
        </div>
        <div>
          Photo submitted by{" "}
          <a
            href={props.image.user.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.image.user.name}
          </a>
        </div>
      </small>
    </React.Fragment>
  ) : null;
};

export default Images;
