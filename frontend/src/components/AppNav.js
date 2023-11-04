import { Link } from "react-router-dom";
import style from "./appNav.module.css";

function AppNav() {
  return (
    <header className={style.navWrap}>
      <div className={style.menuBox}>
        <Link to = "/chatting"><img src="./chattingMenu.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
      <div className={style.menuBox}>
        <Link to = "/reservation"><img src="./reservationMenu.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
      <div className={style.menuBox}>
        <Link to = "/"><img src="./homeMenu.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
      <div className={style.menuBox}>
        <Link to = "/car/data-list"><img src="./carDataMenu.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
      <div className={style.menuBox}>
        <Link to = "/carinfo"><img src="./carInfoMenu.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
    </header>
  );
}

export default AppNav;
