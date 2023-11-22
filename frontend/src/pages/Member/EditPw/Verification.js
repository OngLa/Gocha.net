import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import style from "./verification.module.css";
import LargeButton from "../../../components/Button";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import emailCheckIcon from "../../../img/member/emailcheck.png";
import Swal from "sweetalert2";
import { comparePwVeriCode, getPwVeriCode } from "../../../service/member";

// 이메일 인증 컴포넌트
function Verification() {
  // React Router의 navigate 훅을 사용하기 위한 초기 설정
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state && location.state.email;

  // 이메일 및 인증 코드를 관리하기 위한 상태 변수
  const [veriEmail, setVeriEmail] = useState(email);
  const [veriCode, setVeriCode] = useState("");

  // 이메일 검증 결과 및 표시를 처리하는 상태 변수
  const [EmailCheckApplyResult, setEmailCheckApplyResult] = useState("");
  const [isEmailCheckApplied, setIsEmailCheckApplied] = useState(false);
  const [EmailCheckResult, setEmailCheckResult] = useState("");
  const [codeMsgColor, setCodeMsgColor] = useState("");

  // 이메일 및 인증 코드 필드의 입력 변경을 처리하는 이벤트 핸들러
  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;

    // 입력 필드에 따라 상태 업데이트
    if (name === "veriCode") {
      setVeriCode(value);
    }
  }, []);

  // 다음 버튼 클릭을 처리하는 이벤트 핸들러
  const handleOnClick = () => {
    // 이메일이 확인되었으며 코드 메시지 색상이 녹색인 경우
    if (isEmailCheckApplied && codeMsgColor === "green") {
      navigate("/member/editpw/editpassword");
    } else {
      Swal.fire({
        icon: "warning",
        title: "인증 번호를 다시 확인해주세요.",
        confirmButtonColor: "#45CB85",
      });
    }
  };

  // 입력된 이메일을 확인하고 인증 코드를 전송하는 이벤트 핸들러
  const handleOnCheckEmail = async () => {
    // 이메일 형식을 검증하는 정규식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    try {
      // 유효성 검증 및 인증 코드 전송
      if (veriEmail === "") {
        setEmailCheckApplyResult("이메일을 입력해주세요.");
      } else if (!emailRegex.test(veriEmail)) {
        setEmailCheckApplyResult("올바른 이메일 형식이 아닙니다.");
      } else {
        const requestData = { veriEmail: veriEmail };
        const response = await getPwVeriCode(requestData);

        // 인증 코드가 성공적으로 전송되면 성공 메시지 표시
        Swal.fire({
          icon: "success",
          title: "인증 번호가 발송되었습니다.",
          text: "인증 번호를 확인하신 후 아래 입력창에 입력해주세요.",
          confirmButtonColor: "#45CB85",
        });

        // 이메일이 검증되었음을 나타내는 상태 업데이트
        setIsEmailCheckApplied(true);
        console.log("이메일 인증 성공", response.data);
      }
    } catch (error) {
      // 이메일 검증 실패시 오류 메시지 표시
    if (error.response && error.response.status === 409) {
      // 서버에서 409 코드로 응답했을 때, 이미 사용 중인 이메일임을 나타냄
      setEmailCheckApplyResult("이미 사용 중인 이메일입니다.");
    } else {
      // 기타 오류 처리
      setEmailCheckApplyResult("이메일 인증에 실패했습니다.");
      console.log("이메일 인증 실패", error);
    }
  }
};

  // 입력된 인증 코드를 확인하는 이벤트 핸들러
  const handleOnCheckCode = async () => {
    try {
      // 입력된 인증 코드를 비교
      await comparePwVeriCode(veriEmail, veriCode);
      setEmailCheckResult("인증 번호가 일치합니다.");
      setCodeMsgColor("green");
    } catch (error) {
      // 인증 코드가 일치하지 않으면 오류 메시지 표시
      setEmailCheckResult("인증 번호가 일치하지 않습니다.");
      setCodeMsgColor("red");
    }
  };

  return (
    <div>
      {/* 이메일 확인 섹션을 위한 헤더를 표시 */}
      <div className={style.menu}>
        <ContentHeader menuName="이메일 인증" />
      </div>
      {/* 이메일 확인 양식 */}
      <div className={style.emailWrap}>
        {/* 이메일을 입력하는 입력 필드 */}
        <div className={style.emailBox}>
          <img src={emailIcon} alt="emailIcon" className={style.emailImg} />
          <input
            className={style.emailInput}
            type="email"
            placeholder="이메일"
            name="veriEmail"
            value={veriEmail}
            onChange={handleOnChange}
          />
        </div>
        {/* 이메일 검증 결과를 표시 */}
        <div className={style.result}>{EmailCheckApplyResult}</div>
        {/* 이메일을 확인하고 인증 코드를 전송하는 버튼 */}
        <div className={style.EmailCheckApplyBtn}>
          <LargeButton onClick={handleOnCheckEmail}>인증요청</LargeButton>
        </div>
        {/* 이메일이 검증되면 인증 코드 입력 필드를 표시 */}
        {isEmailCheckApplied && (
          //  {/* 인증번호를 입력하는 입력 필드 */}
          <div className={style.emailBox}>
            <img
              src={emailCheckIcon}
              alt="emailCheckIcon"
              className={style.emailImg}
            />
            <input
              className={style.emailInput}
              type="text"
              placeholder="인증 번호 입력"
              name="veriCode"
              value={veriCode}
              onChange={handleOnChange}
            />
            {/* 입력된 인증 코드를 확인하는 버튼 */}
            <button
              className={style.EmailCheckNumBtn}
              onClick={handleOnCheckCode}
            >
              확인
            </button>
          </div>
        )}
        {/* 인증 코드 확인 결과를 표시 */}
        <div style={{ color: codeMsgColor, textAlign: "center" }}>
          {EmailCheckResult}
        </div>
        {/* 다음 단계로 진행하는 버튼을 표시 */}
        {isEmailCheckApplied && (
          <div className={style.nextBtn}>
            <LargeButton onClick={handleOnClick}>다음</LargeButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verification;
