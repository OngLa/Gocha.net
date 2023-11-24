// import
import React, { useState } from "react";
import style from "./style.module.css";
import upIcon from "../../img/icon/Caret_Up_MD.png";
import downIcon from "../../img/icon/Caret_Down_MD.png";

// Card Component
// Props : title_children(card_header 내용), content_children(card_body 내용)
function Card(props) {
  const { title_children, content_children } = props;

  // card가 펼쳐져 있는지, 닫혀 있는지 상태 저장
  const [isActive, setIsActive] = useState(false);

  // card 상태를 토글하는 함수
  const toggleContent = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={style.card}>
      <button className={style.btn} onClick={toggleContent}>
        {/* 제목 부분, 버튼 클릭 시 내용 보임 */}
        <div className={style.title}>{title_children}</div>
        <img
          className={style.image}
          src={`${isActive ? upIcon : downIcon}`}
          alt="toggle-icon"
        />
      </button>
      {/* 버튼에 따라 내용 숨기거나 보여줌 */}
      <div
        className={`${style.content} ${
          isActive ? style.active : style.nonActive
        }`}
      >
        {content_children}
      </div>
    </div>
  );
}

export default Card;
