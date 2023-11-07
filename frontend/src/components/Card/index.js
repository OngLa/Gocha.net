import React, { useState, useRef } from "react";
import style from "./style.module.css";
import upIcon from '../../img/icon/Caret_Up_MD.png'
import downIcon from '../../img/icon/Caret_Down_MD.png'

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
        <img
          className={style.image}
          src={`${
            isActive ? upIcon : downIcon
          }`}
          alt="toggle-icon"
        />
      </button>
      <div
        className={`${style.content} ${
          isActive ? style.active : style.nonActive
        }`}
        ref={contentRef}
      >
        {content_children}
      </div>
    </div>
  );
}

export default Card;
