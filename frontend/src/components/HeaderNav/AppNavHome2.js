import { Link } from "react-router-dom";
import style from "./appNavHome2.module.css";

function AppNavHome2() {
  return (
    <header className={style.navWrap}>
      <div className={style.sideBox}></div>
      <Link to="/home2" className={style.menuBox}>
        <img
          src="./navMenu/homeMenu.png"
          alt="Gochanet"
          className={style.homeImgStyle}
        />
      </Link>
      <div className={style.sideBox}></div>
      <div className={style.menuBox}>
        <Link to="/chatting">
          <img
            src="./navMenu/chattingMenu.png"
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>비대면 진단</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/reservation">
          <img
            src="./navMenu/reservationMenu.png"
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>예약하기</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/parts">
          <img
            src="./navMenu/partsMenu.png"
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
