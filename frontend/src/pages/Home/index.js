import React, { useState } from "react";
import style from "./home.module.css";
import homeBackground from "../../img/homeBackground.png";

function HomeUser() {

  return (
    <div
      className={style.homeWrap}>
      <img
        src={homeBackground}
        alt="homeBackground"
        className={style.homeBackground}
      />
    </div>
  );
}

export default HomeUser;
