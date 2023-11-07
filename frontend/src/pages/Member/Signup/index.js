import { Link, useNavigate } from "react-router-dom";
import LargeButton from "../../../components/Button";
import style from "./signup.module.css";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
  });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const [nicknameCheckResult, setNicknameCheckResult] = useState(""); // 상태 추가

  const checkId = async () => {
    setNicknameCheckResult("닉네임 사용 가능");
  };

  const onClick = async (event) => {
    // 항목 전부 입력해야 회원가입 가능
    if (
      !member.email ||
      !member.password ||
      !member.confirmPassword ||
      !member.nickname ||
      !member.phoneNumber
    ) {
      return alert("모든 항목을 입력해주세요.");
    } else if (member.password !== member.confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      alert("회원가입이 완료되었습니다.");
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
      <div className={style.pageInfo}>
        <Link to="/">
          <img src="/memberIcon/back.png" alt="뒤로가기" />
        </Link>
        <span>회원가입</span>
      </div>
      <div className={style.memberWrap}>
        <form onSubmit={handleSubmit}>
          <div className={style.memberBox}>
            <img
              src="/memberIcon/email.png"
              alt="emailImg"
              className={style.memberImg}
            />
            <input
              className={style.memberInput}
              type="email"
              placeholder="이메일"
              value={member.email}
              name="email"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <img
              src="/memberIcon/password.png"
              alt="passworImg"
              className={style.memberImg}
            />
            <input
              className={style.memberInput}
              type="password"
              placeholder="비밀번호"
              value={member.password}
              name="password"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <img
              src="/memberIcon/password.png"
              alt="confirmPasswordImage"
              className={style.memberImg}
            />
            <input
              className={style.memberInput}
              type="password"
              placeholder="비밀번호 확인"
              value={member.confirmPassword}
              name="confirmPassword"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className={style.memberBox}>
            <img
              src="/memberIcon/nickname.png"
              alt="nicknameImg"
              className={style.memberImg}
            />
            <input
              className={style.memberInput}
              type="text"
              placeholder="닉네임"
              value={member.nickname}
              name="nickname"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button className={style.checkIdBtn} onClick={checkId}>
              중복체크
            </button>
          </div>
          <div className={style.nicknameCheckResult}>{nicknameCheckResult}</div>
          <div className={style.memberBox}>
            <img
              src="/memberIcon/phone.png"
              alt="phoneImg"
              className={style.memberImg}
            />
            <input
              className={style.memberInput}
              type="text"
              placeholder="전화번호"
              value={member.phoneNumber}
              name="phoneNumber"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className={style.signupBtn}>
            <LargeButton onClick={onClick}>회원가입 완료</LargeButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
