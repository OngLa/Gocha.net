import React, { useState, useRef } from "react";
import style from "./style.module.css";

function Card(props) {
  const { title_children, content_children } = props;
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef(null);

  const toggleContent = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={style.card}>
      <button className={style.btn} onClick={toggleContent}>
        <div className={style.title}>{title_children}</div>
        <img className={style.image}
          src={`${
            isActive ? "/icon/Caret_Up_MD.png" : "/icon/Caret_Down_MD.png"
          }`}
        />
      </button>
      <div
        className={`${style.content} ${
          isActive ? style.active : style.nonActive
        }`}
        ref={contentRef}
      >
        {/* <hr/> */}
        {content_children}
      </div>
    </div>
  );
}

export default Card;
