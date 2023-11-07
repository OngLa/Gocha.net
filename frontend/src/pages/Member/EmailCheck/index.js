import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./emailCheck.module.css";
import LargeButton from "../../../components/Button";
import ContentHeader from "../../../components/ContentHeader";

function EmailCheck() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: "",
    verificationCode: "",
  });

  const handleOnChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
      navigate("/member/signup");
      // navigate("/member/editPassword");
  };
  
  const [EmailCheckApplyResult, setEmailCheckApplyResult] = useState("");

  const handleEmailCheckApply = () => {
    setEmailCheckApplyResult("올바른 이메일 형식이 아닙니다.");
  };

  const [EmailCheckResult, setEmailCheckResult] = useState("");

  const handleEmailCheckNum = () => {
    setEmailCheckResult("인증 번호가 일치하지 않습니다.");
  };

  return (
    <>
      <div className={style.menu}>
        <ContentHeader menuName="이메일 인증" />
      </div>
      <div className={style.emailWrap}>
        <div className={style.emailBox}>
          <img
            src="/memberIcon/email.png"
            alt="emailImg"
            className={style.emailImg}
          />
          <input
            className={style.emailInput}
            type="email"
            placeholder="이메일"
            name="email"
            value={email.email}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className={style.result}>{EmailCheckApplyResult}</div>
        <div className={style.EmailCheckApplyBtn}>
          <LargeButton onClick={handleEmailCheckApply}>인증요청</LargeButton>
        </div>
        <div className={style.emailBox}>
          <img
            src="/memberIcon/emailcheck.png"
            alt="emailCheckImg"
            className={style.emailImg}
          />
          <input
            className={style.emailInput}
            type="text"
            placeholder="인증번호 입력"
            name="verificationCode"
            value={email.verificationCode}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          <button
            className={style.EmailCheckNumBtn}
            onClick={handleEmailCheckNum}
          >
            확인
          </button>
        </div>
        <div className={style.result}>{EmailCheckResult}</div>
        <div className={style.nextBtn}>
          <LargeButton onClick={handleOnClick}>다음</LargeButton>
        </div>
      </div>
    </>
  );
}

export default EmailCheck;
