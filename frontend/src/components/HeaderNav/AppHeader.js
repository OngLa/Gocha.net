import { Link, useNavigate } from "react-router-dom";
import style from "./appHeader.module.css";
import logo from "../../img/logo.png"
import memberMenu from "../../img/navMenu/memberMenu.png"

function AppHeader() {
  // App 헤더.
  // fiexd로서 아래로 스크롤해도 보임.
  // 메인 로고 클릭하면 home으로 이동.
  // 고객 아이콘 클릭하면 정보수정 이동.
  return (
    <header>
      <div className={style.headerWrap}>
        <div className={style.flexHeader}>
          <div className={style.sideBox}></div>
          <Link to="/" className={style.logoWrap}>
            <img src={logo} alt="Gochanet" className={style.logoStyle} />
          </Link>
          <div className={style.sideBox}>
            <Link to="/member/login" className={style.memberWrap}>
              <img
                src={memberMenu}
                alt="Member"
                className={style.MemberStyle}
              />
            </Link>
          </div>
        </div>
        <div className={style.hrLineWrap}>
          <div className={style.hrSideBox}></div>
          <div className={style.hrLine}></div>
          <div className={style.hrSideBox}></div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
