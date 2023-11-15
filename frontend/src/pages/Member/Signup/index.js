import LargeButton from "../../../components/Button";
import style from "./signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";
import confirmPasswordIcon from "../../../img/member/password.png";
import nicknameIcon from "../../../img/member/nickname.png";
import phoneIcon from "../../../img/member/phone.png";
import Swal from "sweetalert2";

function Signup() {
  /* 회원가입*/
  const navigate = useNavigate();

  const [member, setMember] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // 숫자와 하이픈만 포함하는 정규 표현식을 사용해 형식을 체크하고, 형식에 맞지 않으면 수정하지 않음
      if (/^[0-9-]*$/.test(value)) {
        // 하이픈을 모두 제거하고 숫자만 남김
        const numericValue = value.replace(/-/g, "").replace(/[^0-9]/g, "");

        // 11자리 전화번호 형식으로 변환
        if (numericValue.length >= 3) {
          const formattedPhoneNumber = numericValue.replace(
            /(\d{3})(\d{4})(\d{4})/,
            "010-$2-$3"
          );

          setMember({
            ...member,
            [name]: formattedPhoneNumber,
          });
        } else {
          setMember({
            ...member,
            [name]: numericValue,
          });
        }
      }
    } else {
      // 다른 입력 필드는 그대로 업데이트
      setMember({
        ...member,
        [name]: value,
      });
    }
  };

  const [nicknameCheckResult, setNicknameCheckResult] = useState("");

  const handleCheckId = async () => {
    // //클라이언트에서 서버로 POST 요청을 보냅니다.
    // try {
    //   const response = await fetch('/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ nickname: member.nickname }), // member.nickname를 서버로 전송
    //   });
  
    //   if (response.ok) {
    //     const data = await response.json();
           const data = ["user1", "user2"]
  
        if (member.nickname === "") {
          setNicknameCheckResult('닉네임을 입력해주세요');
        } 
        else if (data.isNicknameAvailable) {
          setNicknameCheckResult('닉네임 사용 가능');
        } else {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
        }
    //   } else {
    //     // 요청이 실패한 경우에 대한 처리
    //     console.error('서버 요청 실패');
    //   }
    // } catch (error) {
    //   console.error('오류 발생', error);
    // }
  };  

  const hadleSignupComp = async (event) => {
    // console.log("test");
    if (
      !member.email ||
      !member.password ||
      !member.confirmPassword ||
      !member.nickname ||
      !member.phoneNumber
    ) {
      return Swal.fire({
        icon: "warning",
        title: "모든 항목을 입력해주세요.",
        confirmButtonColor: '#45CB85',
      });
    } else if (member.password !== member.confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        confirmButtonColor: '#45CB85',
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "회원가입이 완료되었습니다.",
        confirmButtonColor: '#45CB85',
      });
      navigate("/member/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      email: member.email,
      password: member.password,
      confirmPassword: member.confirmPassword,
      nickname: member.nickname,
      phoneNumber: member.phoneNumber,
    };
  };

  return (
    <>
      <div className={style.menu}>
        <ContentHeader menuName="회원가입" />
      </div>
      <div className={style.memberWrap}>
        <form onSubmit={handleSubmit}>
          <div className={style.memberBox}>
            <div className={style.imgWrap}>
              <img
                src={emailIcon}
                alt="emailIcon"
                className={style.memberImg}
              />
            </div>
            <input
              className={style.memberInput}
              type="email"
              placeholder="이메일"
              value={member.email}
              name="email"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <div className={style.imgWrap}>
              <img
                src={passwordIcon}
                alt="passwordIcon"
                className={style.memberImg}
              />
            </div>
            <input
              className={style.memberInput}
              type="password"
              placeholder="비밀번호"
              value={member.password}
              name="password"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <div className={style.imgWrap}>
              <img
                src={confirmPasswordIcon}
                alt="confirmPasswordIcon"
                className={style.memberImg}
              />
            </div>
            <input
              className={style.memberInput}
              type="password"
              placeholder="비밀번호 확인"
              value={member.confirmPassword}
              name="confirmPassword"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <div className={style.imgWrap}>
              <img
                src={nicknameIcon}
                alt="nicknameIcon"
                className={style.memberImg}
              />
            </div>
            <input
              className={style.memberInput}
              type="text"
              placeholder="닉네임"
              value={member.nickname}
              name="nickname"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <button className={style.checkIdBtn} onClick={handleCheckId}>
              중복체크
            </button>
          </div>
          <div className={style.nicknameCheckResult}>{nicknameCheckResult}</div>
          <div className={style.memberBox}>
            <div className={style.imgWrap}>
              <img
                src={phoneIcon}
                alt="phoneIcon"
                className={style.memberImg}
              />
            </div>
            <input
              className={style.memberInput}
              type="text"
              placeholder="전화번호"
              value={member.phoneNumber}
              name="phoneNumber"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.signupBtn}>
            <LargeButton onClick={hadleSignupComp}>회원가입 완료</LargeButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
