import { Link, useNavigate } from "react-router-dom";
import style from "./appHeader.module.css";

function AppHeader() {
  const navigate = useNavigate();
  return (
    <header>
      <div className={style.headerWrap}>
        {/* <img src="./logo.png" alt="Gochanet" className={style.logoStyle} onClick={()=>{navigate("/")}}/> */}
        <div className={style.flexHeader}>
          <div className={style.sideBox}></div>
          <Link to="/" className={style.logoWrap}>
            <img src="./logo.png" alt="Gochanet" className={style.logoStyle} />
          </Link>
          <div className={style.sideBox}>
            <Link to="/member/login" className={style.memberWrap}>
              <img
                src="./navMenu/memberMenu.png"
                alt="Member"
                className={style.MemberStyle}
              />
            </Link>
          </div>
        </div>
        <hr className={style.hrLine} />
      </div>
    </header>
  );
}

export default AppHeader;
