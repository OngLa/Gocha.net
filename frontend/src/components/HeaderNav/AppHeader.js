import { Link } from "react-router-dom";
import style from "./appHeader.module.css";
import logo from "../../img/logo.png";
import loginIcon from "../../img/navMenu/loginIcon.png";
import mypageIcon from "../../img/navMenu/mypageIcon.png";
import { useSelector } from "react-redux";

function AppHeader() {
  // App 헤더.
  // fiexd로서 아래로 스크롤해도 보임.
  // 메인 로고 클릭하면 home으로 이동.
  // 고객 아이콘 클릭하면 로그인페이지(로그아웃시) / 마이페이지(로그인시) 이동.
  
  // 로그인 여부에 따라 고객 아이콘 이동 페이지가 달라지기에, 로그인 여부를 redux-user를 통해 확인.
  const user = useSelector((state) => state.authReducer.user);

  return (
    <header>
      <div className={style.headerWrap}>
        <div className={style.flexHeader}>
          <div className={style.sideBox}></div>
          <Link to="/" className={style.logoWrap}>
            <img src={logo} alt="Gochanet" className={style.logoStyle} />
          </Link>
          <div className={style.sideBox}>
            {/* 로그인 안했을 경우 로그인 / 로그인했으면 마이페이지 */}
            {user === "" ? (
              <div>
                <Link to="/member/login" className={style.memberWrap}>
                  <img
                    src={loginIcon}
                    alt="Member"
                    className={style.MemberStyle}
                  />
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/member/mypage" className={style.memberWrap}>
                  <img
                    src={mypageIcon}
                    alt="Member"
                    className={style.MemberStyle}
                  />
                </Link>
              </div>
            )}
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
