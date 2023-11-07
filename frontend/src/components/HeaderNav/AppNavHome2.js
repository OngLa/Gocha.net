import { Link } from "react-router-dom";
import style from "./appNavHome2.module.css";
import homeMenu from "../../img/navMenu/homeMenu.png"
import chattingMenu from "../../img/navMenu/chattingMenu.png"
import reservationMenu from "../../img/navMenu/reservationMenu.png"
import partsMenu from "../../img/navMenu/partsMenu.png"

function AppNavHome2() {
  // 정비소의 하단 Nav바.
  // 진단/예약/부품 관리 페이지 이동 가능.

  return (
    <header className={style.navWrap}>
      <div className={style.sideBox}></div>
      <Link to="/" className={style.menuBox}>
        <img
          src={homeMenu}
          alt="Gochanet"
          className={style.homeImgStyle}
        />
      </Link>
      <div className={style.sideBox}></div>
      <div className={style.menuBox}>
        <Link to="/chatting2">
          <img
            src={chattingMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>비대면 진단</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/reservationadmin">
          <img
            src={reservationMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>예약하기</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/parts">
          <img
            src={partsMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>부품 관리</div>
      </div>
      <div className={style.sideBox}></div>
    </header>
  );
}

export default AppNavHome2;
