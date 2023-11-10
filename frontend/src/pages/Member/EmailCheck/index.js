import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./emailCheck.module.css";
import LargeButton from "../../../components/Button";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import emailCheckIcon from "../../../img/member/emailcheck.png";
import Swal from "sweetalert2";

function EmailCheck() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: "",
    verificationCode: "",
  });

  const [EmailCheckApplyResult, setEmailCheckApplyResult] = useState("");
  const [isEmailCheckApplied, setIsEmailCheckApplied] = useState(false);
  const [EmailCheckResult, setEmailCheckResult] = useState("");

  const handleOnChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
    navigate("/member/signup");
  };

  const handleEmailCheckApply = () => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (emailRegex.test(email.email) === true) {
      setEmailCheckApplyResult("올바른 이메일 형식이 아닙니다.");
      setIsEmailCheckApplied(false);
    } else if (email.email === "") {
      setEmailCheckApplyResult("이메일을 입력해주세요.");
    } else {
      Swal.fire({
        icon: "success",
        title: "인증 번호가 발송되었습니다.",
        text: "인증 번호를 확인하신 후 아래 입력창에 입력해주세요.",
        confirmButtonColor: '#45CB85',
      })
      setIsEmailCheckApplied(true);
    }
  };

  const handleEmailCheckNum = () => {
    setEmailCheckResult("인증 번호가 일치하지 않습니다.");
  };

  return (
    <div>
      <div className={style.menu}>
        <ContentHeader menuName="이메일 인증" />
      </div>
      <div className={style.emailWrap}>
        <div className={style.emailBox}>
          <img src={emailIcon} alt="emailIcon" className={style.emailImg} />
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
        {isEmailCheckApplied && (
          <div className={style.emailBox}>
            <img
              src={emailCheckIcon}
              alt="emailCheckIcon"
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
        )}
        <div className={style.result}>{EmailCheckResult}</div>
        <div className={style.nextBtn}>
          <LargeButton onClick={handleOnClick}>다음</LargeButton>
        </div>
      </div>
    </div>
  );
}

export default EmailCheck;
