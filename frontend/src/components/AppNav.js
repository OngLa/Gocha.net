import { Link, useNavigate } from "react-router-dom";
import style from "./appNav.module.css";

function AppNav() {
  const navigate = useNavigate();
  return (
    <header>
      <div className={style.navWrap}>
        <Link to = "/"><img src="./navLogo.png" alt="Gochanet" className={style.logoStyle}/></Link>
      </div>
    </header>
  );
}

export default AppNav;
