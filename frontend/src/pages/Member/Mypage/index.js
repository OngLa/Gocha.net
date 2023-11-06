import { useState } from "react"; 
import style from "./mypage.module.css"
import { Link } from "react-router-dom";

function Mypage() {

  const [mypage, setMypage] = useState({
    email: 'test@test',
    password: '*******',
    nickname: 'test',
    phoneNumber: '010-1111-1111',
    carType: [],
    carcenter: [],
  })

  return(

    <>
    <div className={style.pageInfo}>
      <Link to="/"><img src ="/memberIcon/back.png" alt="뒤로가기" /></Link>
      <span>회원가입</span>
    </div>
    <div className={style.mypageWrap}>
      <div className={style.mypageBox}>
        <img
          src="/memberIcon/email-white.png"
          alt="emailImg"
          className={style.mypageImg}
        />
        <div className={style.text}>{mypage.email}</div>
      </div>
      <div className={style.mypageBox}>
        <img
          src="/memberIcon/password-white.png"
          alt="passwordImg"
          className={style.mypageImg}
        />
        <div className={style.text}>{mypage.password}</div>
      </div>
      <div className={style.mypageBox}>
        <img
          src="/memberIcon/nickname-white.png"
          alt="nicknameImg"
          className={style.mypageImg}
        />
        <div className={style.text}>{mypage.nickname}</div>
      </div>
      <div className={style.mypageBox}>
        <img
          src="/memberIcon/phone-white.png"
          alt="phoneImg"
          className={style.mypageImg}
        />
        <div className={style.text}>{mypage.phoneNumber}</div>
      </div>
      <div className={style.mypageBox}>
        <img
          src="/memberIcon/reservation.png"
          alt="reservationImg"
          className={style.mypageImg}
        />
        <Link to="/">내 예약목록</Link>
      </div>
      </div>
      </>
  );
}

export default Mypage;