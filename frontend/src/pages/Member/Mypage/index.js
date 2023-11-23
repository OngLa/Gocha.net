import { useEffect, useState } from "react";
import style from "./mypage.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import { SmallButton } from "../../../components/Button";
import emailIcon from "../../../img/member/email-white.png";
import passwordIcon from "../../../img/member/password-white.png";
import nicknameIcon from "../../../img/member/nickname-white.png";
import phoneIcon from "../../../img/member/phone-white.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setUser,
  setRole,
  setAccessToken,
  setRefreshToken,
} from "../../../redux/authReducer";
import { removeAuthHeader } from "../../../service/axiosConfig";
import { getMypage } from "../../../service/member";

function Mypage() {
  // 마이페이지
  // ㄴ비밀번호 수정 페이지 이동
  // ㄴ회원탈퇴 & 로그아웃

  const navigate = useNavigate();

  // 사용자 정보 상태 변수
  const [mypage, setMypage] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  // URL에서 이메일 파라미터 가져오기
  const email = useParams.email;

  // 페이지 로드 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMypage(email);
        setMypage(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [email]);

  // 비밀번호를 그대로 반환하는 함수
  const maskPassword = (password) => {
    return password;
  };

  // 비밀번호 수정 페이지로 이동
  const handleEditPassword = () => {
    navigate("/member/editPw", { state: { email: mypage.email } });
  };

  // 회원탈퇴 처리
  const handleWithdrawal = (e) => {
    return Swal.fire({
      icon: "question",
      title: "정말로 탈퇴하시겠습니까?",
      text: "탈퇴 시, 모든 정보가 사라집니다.",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: "#45CB85",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "회원 탈퇴가 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
        navigate("/");
      }
    });
  };

  // 로그아웃 시 redux 변수를 초기화 시켜주기 위해 dispatch 생성
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    return Swal.fire({
      icon: "question",
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: "#45CB85",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redux 상태 및 로컬 스토리지 초기화
        dispatch(setUser({ user: "" }));
        dispatch(setRole({ role: "" }));
        dispatch(setAccessToken({ accessToken: "" }));
        dispatch(setRefreshToken({ refreshToken: "" }));
        // localstorage & header 제거
        localStorage.clear();
        removeAuthHeader();

        Swal.fire({
          icon: "success",
          title: "정상적으로 로그아웃 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
        navigate("/");
      }
    });
  };

  return (
    <div>
      {/* 마이페이지 메뉴 헤더 */}
      <div className={style.menu}>
        <ContentHeader menuName="마이페이지" />
      </div>

      {/* 마이페이지 내용 */}
      <div className={style.mypageWrap}>
        {/* 이메일 정보 */}
        <div className={style.mypageBox}>
          <img src={emailIcon} alt="emailIcon" className={style.mypageImg} />
          <div className={style.text}>{mypage.email}</div>
        </div>

        {/* 비밀번호 정보 */}
        <div className={style.mypageBox}>
          <img
            src={passwordIcon}
            alt="passwordIcon"
            className={style.mypageImg}
          />
          <div className={style.text}>{maskPassword("비밀번호")}</div>
          <SmallButton
            onClick={handleEditPassword}
            style={{
              width: "55px",
              height: "25px",
              margin: "0px 5px",
              paddingLeft: "9px",
            }}
          >
            수정하기
          </SmallButton>
        </div>

        {/* 이름 정보 */}
        <div className={style.mypageBox}>
          <img
            src={nicknameIcon}
            alt="nicknameIcon"
            className={style.mypageImg}
          />
          <div className={style.text}>{mypage.name}</div>
        </div>

        {/* 전화번호 정보 */}
        <div className={style.mypageBox}>
          <img src={phoneIcon} alt="phoneIcon" className={style.mypageImg} />
          <div className={style.text}>{mypage.phoneNumber}</div>
        </div>

        {/* 회원탈퇴 버튼 */}
        <div className={style.withdrawalBox}>
          <button className={style.withdrawalBtn} onClick={handleWithdrawal}>
            회원탈퇴
          </button>
        </div>

        {/* 로그아웃 버튼 */}
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
