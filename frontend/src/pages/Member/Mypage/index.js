import { useState } from "react";
import style from "./mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import { SmallButton } from "../../../components/Button";
import emailIcon from "../../../img/member/email-white.png";
import passwordIcon from "../../../img/member/password-white.png";
import nicknameIcon from "../../../img/member/nickname-white.png";
import phoneIcon from "../../../img/member/phone-white.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser, setRole, setAccessToken, setRefreshToken } from "../../../redux/authReducer";
import { removeAuthHeader } from "../../../service/axiosConfig";

function Mypage() {
  const navigate = useNavigate();

  const [mypage, setMypage] = useState({
    email: "test@test",
    password: "*******",
    nickname: "test nickname",
    phoneNumber: "010-1111-1111",
  });

  const handleEditPassword = () => {
    navigate("/member/emailCheck");
  };

  const handleWithdrawal = (e) => {
    return Swal.fire({
      icon: "question",
      title: "정말로 탈퇴하시겠습니까?",
      text: "탈퇴 시, 모든 정보가 사라집니다.",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: '#45CB85',
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "회원 탈퇴가 정상 처리 되었습니다.",
          confirmButtonColor: '#45CB85'
        });
      }
      navigate('/');
    });
  };

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    return Swal.fire({
      icon: "question",
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: '#45CB85',
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        // globalstate & localstorage 초기화
        dispatch(setUser({ user: "" }));
        dispatch(setRole({ role: "" }));
        dispatch(setAccessToken({ accessToken: "" }));
        dispatch(setRefreshToken({ refreshToken: "" }));
        localStorage.clear();
        removeAuthHeader()

        Swal.fire({
          icon: "success",
          title: "정상적으로 로그아웃 되었습니다.",
          confirmButtonColor: '#45CB85'
        });
      }
      navigate('/');
    });
  }

  return (
    <div>
      <div className={style.menu}>
        <ContentHeader menuName="마이페이지" />
      </div>
      <div className={style.mypageWrap}>
        <div className={style.mypageBox}>
          <img src={emailIcon} alt="emailIcon" className={style.mypageImg} />
          <div className={style.text}>{mypage.email}</div>
        </div>
        <div className={style.mypageBox}>
          <img
            src={passwordIcon}
            alt="passwordIcon"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.password}</div>
          <SmallButton
            className={style.editpasswordBtn}
            onClick={handleEditPassword}
            style={{ width: "80px", height: "25px" }}
          >
            수정하기
          </SmallButton>
        </div>
        <div className={style.mypageBox}>
          <img
            src={nicknameIcon}
            alt="nicknameIcon"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.nickname}</div>
        </div>
        <div className={style.mypageBox}>
          <img src={phoneIcon} alt="phoneIcon" className={style.mypageImg} />
          <div className={style.text}>{mypage.phoneNumber}</div>
        </div>
        <div className={style.withdrawalBox}>
          <button className={style.withdrawalBtn} onClick={handleWithdrawal}>
            회원탈퇴
          </button>
        </div>
        <div className={style.withdrawalBox}>
          <button className={style.withdrawalBtn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
