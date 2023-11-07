import { Link } from "react-router-dom";
import style from "./appNav.module.css";

function AppNav() {
  return (
    <header className={style.navWrap}>
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
      <Link to="/home2" className={style.menuHomeBox}>
        <img
          src="./navMenu/homeMenu.png"
          alt="Gochanet"
          className={style.homeImgStyle}
        />
      </Link>
      <div className={style.menuBox}>
        <Link to="/car/data-list">
          <img
            src="./navMenu/carDataMenu.png"
            alt="Gochanet"
            className={style.navImgStyle}
          />
        </Link>
        <div>차량 데이터</div>
      </div>
      <div className={style.menuBox}>
        <Link to="/car/info">
          <img
            src="./navMenu/carInfoMenu.png"
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
