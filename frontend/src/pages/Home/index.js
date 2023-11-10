import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import homeBackground from "../../img/homeBackground_wide.png";

function Home() {

  return (
    <div className={style.homeWrap}>
      <img
        src={homeBackground}
        alt="homeBackground"
        className={style.homeBackground}
      />
      <div className={style.textBox}>
        <div className={style.title}>
          🚗 GOCHANET: 당신의 자동차 진단 전문가 🛠️
        </div>
        <div className={style.describe}>
          안녕하세요! '고차넷'은 모든 자동차 소유자를 위한 필수 앱으로,
        </div>
        <div className={style.describe} style={{ marginBottom: "12px" }}>
          자동차 정비와 관리를 더욱 편리하고 쉽게 만들어 드립니다.
        </div>
        <div className={style.describe}>
          자동차는 우리의 일상생활에서 중요한 부분을 차지하며,
        </div>
        <div className={style.describe}>
          그에 따른 유지 및 관리의 필요성이 커지고 있습니다.
        </div>
        <div className={style.describe}>
          '고차넷'은 이러한 요구를 충족시켜 드립니다.
        </div>
      </div>
    </div>
  );
}

export default Home;
