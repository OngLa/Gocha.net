import { Link } from "react-router-dom";
import style from "./appNav.module.css";
import chattingMenu from "../../img/navMenu/chattingMenu.png";
import reservationMenu from "../../img/navMenu/reservationMenu.png";
import homeMenu from "../../img/navMenu/homeMenu.png";
import carDataMenu from "../../img/navMenu/cardataMenu.png";
import carInfoMenu from "../../img/navMenu/carinfoMenu.png";

function AppNav() {
  // 고객의 하단 Nav바.
  // 진단/예약/차량데이터/내차정보 이동 가능

  return (
    <header className={style.navWrap}>
      <div className={style.menuBox}>
        <Link to="/chatting">
          <img
            src={chattingMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>비대면 진단</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/reservation">
          <img
            src={reservationMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>예약하기</div>
      </div>
      <Link to="/" className={style.menuHomeBox}>
        <img
          src={homeMenu}
          alt="Gochanet"
          className={style.homeImgStyle}
        />
      </Link>
      <div className={style.menuBox}>
        <Link to="/car/data-list">
          <img
            src={carDataMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>차량 데이터</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/car/info">
          <img
            src={carInfoMenu}
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>내차 정보</div>
      </div>
    </header>
  );
}

export default AppNav;
