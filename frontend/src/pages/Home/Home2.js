import React, { useState } from "react";
import style from "./home2.module.css";
import homeBackground from "../../img/homeBackground.png";

function HomeUser() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // 확대 상태로 변경

    // 1초 후에 자동으로 원래 크기로 돌아가도록 설정
    setTimeout(() => {
      setIsHovered(false); // 원래 크기로 변경
    }, 1000);
  };

  return (
    <div
      className={`${style.homeWrap} ${isHovered ? style.hovered : ""}`}
      onClick={handleMouseEnter}
    >
      <img
        src={homeBackground}
        alt="homeBackground"
        className={style.homeBackground}
      />
    </div>
  );
}

export default HomeUser;
