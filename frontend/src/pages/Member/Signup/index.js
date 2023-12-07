import LargeButton from "../../../components/Button";
import style from "./signup.module.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";
import confirmPasswordIcon from "../../../img/member/password.png";
import nicknameIcon from "../../../img/member/nickname.png";
import phoneIcon from "../../../img/member/phone.png";
import Swal from "sweetalert2";
import { createMember, nameCheck } from "../../../service/member";

// 회원가입 컴포넌트
function Signup() {
  // React Router의 navigate 훅을 사용하기 위한 초기 설정

  const navigate = useNavigate();
  const location = useLocation();
  const veriEmail = location.state && location.state.veriEmail;

  // 각 항목의 초기 상태 설정
  const [email, setEmail] = useState(veriEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryEmail = query.get("email");
    if (queryEmail) setEmail(queryEmail);
    }, []);

  // 비밀번호 유효성 검사 함수
  const validatePwd = (password) => {
    return password.match(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
    );
  };

  // 닉네임 유효성 검사 함수
  const validateName = (nickname) => {
    return nickname.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{0,8}$/);
  };

  // 상태 및 유효성 검사 결과를 저장하는 변수들
  const [pwdMsgColor, setPwdMsgColor] = useState("");
  const [confirmPwdMsgColor, setConfirmPwdMsgColor] = useState("");
  const [phoneNumberMsgColor, setPhoneNumberMsgColor] = useState("");
  const [nameMsgColor, setNameMsgColor] = useState("");
  const isPwdValid = validatePwd(password);
  const isconfirmPwdValid = password === confirmPassword;
  const isNameValid = validateName(nickname);
  const isPhoneNumber = phoneNumber.length === 13;

  // 각 항목에 대한 유효성 검사 메시지를 저장하는 변수들
  const [PwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setconfirmPwdMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [phoneNumberMsg, setPhoneNumberMsg] = useState("");

  // 각 항목 변경 이벤트 핸들러들
  // 비밀번호
  const handleOnChangePwd = useCallback((e) => {
    const curPwd = e.target.value;
    setPassword(curPwd);

    if (!validatePwd(curPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
      setPwdMsgColor("#ffda47");
    } else {
      setPwdMsg("사용 가능한 비밀번호입니다.");
      setPwdMsgColor("green");
    }
  }, []);

  // 비밀번호 확인
  const handleOnChangeConfirmPwd = useCallback(
    (e) => {
      const curConfirmPwd = e.target.value;
      setConfirmPassword(curConfirmPwd);

      if (curConfirmPwd !== password) {
        setconfirmPwdMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        setConfirmPwdMsgColor("#ffda47");
      } else {
        setconfirmPwdMsg("비밀번호와 비밀번호 확인이 일치합니다.");
        setConfirmPwdMsgColor("green");
      }
    },
    [password]
  );

  // 닉네임
  const handleOnChangeName = useCallback((e) => {
    const curNickname = e.target.value;
    setNickname(curNickname);

    setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.(특수 문자 제외)");
    setNameMsgColor("#ffda47");
  }, []);

  // 전화번호
  const formatPhoneNumber = (input) => {
    // 숫자가 아닌 문자를 제거
    const phoneNumber = input.replace(/\D/g, "");

    // 전화번호의 길이에 따라 형식을 적용
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        7
      )}-${phoneNumber.slice(7, 11)}`;
    }
  };

  const handleOnChangePhonNumber = useCallback((e) => {
    const rawPhoneNumber = e.target.value;
    const formattedNumber = formatPhoneNumber(rawPhoneNumber);
    setPhoneNumber(formattedNumber);

    if (rawPhoneNumber.length === 13 || rawPhoneNumber.length === 14) {
      setPhoneNumberMsg("사용 가능한 전화번호입니다.");
      setPhoneNumberMsgColor("green");
    } else {
      setPhoneNumberMsg("올바른 전화번호 형식이 아닙니다.");
      setPhoneNumberMsgColor("#ffda47");
    }

    setPhoneNumber(formattedNumber); // 필요한 경우 원시 전화번호를 상태로 설정합니다.
  }, []);

  // 닉네임 중복 검사
  const handleCheckName = async (event) => {
    event.preventDefault();

    try {
      if (nickname === "") {
        setNicknameMsg("닉네임을 입력해주세요.");
        setNameMsgColor("#ffda47");
      } else {
        await nameCheck(nickname);

        setNicknameMsg("사용 가능한 닉네임입니다.");
        setNameMsgColor("green");
      }
    } catch (error) {
      setNicknameMsg("이미 사용 중인 닉네임입니다.");
      setNameMsgColor("#ffda47");
    }
  };

  // 서버에 회원가입 요청
  const handleSubmit = async () => {
    try {
      const requestData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: nickname,
        phoneNumber: phoneNumber,
        role: "ROLE_USER",
      };
      await createMember(requestData);
    } catch (error) {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        icon: "error",
        text: "회원가입 중 오류가 발생했습니다.",
        confirmButtonText: "확인"
      });
    }
  };

  // 회원 가입 완료 버튼 클릭 시 실행
  const hadleSignupComp = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword || !nickname || !phoneNumber) {
      return Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        icon: "warning",
        text: "모든 항목을 입력해주세요.",
        confirmButtonText: "확인",
      });
    } else if (
      !isPwdValid ||
      !isconfirmPwdValid ||
      !isNameValid ||
      !isPhoneNumber ||
      nicknameMsg === "#ffda47"
    ) {
      return Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        icon: "warning",
        text: "일치하지 않은 항목이 있습니다.",
        html: "- 비밀번호: 영문, 숫자, 특수기호 조합으로 8자리 이상 입력해 주세요.<br>- 닉네임: 1글자 이상 9글자 미만으로 입력해 주세요.(특수 문자 제외)<br>- 전화번호: 휴대전화번호가 정확한지 확인해 주세요.",
        confirmButtonText: "확인"
      });
    } else {
      handleSubmit();

      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        icon: "success",
        text: "회원가입이 완료되었습니다.",
        confirmButtonText: "확인"
      });
      navigate("/member/login");
    }
  };

  return (
    <div>
      {/* 회원가입 메뉴 헤더 */}
      <div className={style.menu}>
        <ContentHeader menuName="회원가입" />
      </div>

      {/* 회원가입 폼 영역 */}
      <div className={style.memberWrap}>
        <form>
          {/* 이메일 입력란 */}
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
              value={email}
              name="email"
            />
          </div>

          {/* 비밀번호 입력란 */}
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
              value={password}
              name="password"
              onChange={handleOnChangePwd}
            />
          </div>
          <div style={{ color: pwdMsgColor, textAlign: "center" }}>
            {PwdMsg}
          </div>

          {/* 비밀번호 확인 입력란 */}
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
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleOnChangeConfirmPwd}
            />
          </div>
          <div style={{ color: confirmPwdMsgColor, textAlign: "center" }}>
            {confirmPwdMsg}
          </div>

          {/* 닉네임 입력란 */}
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
              value={nickname}
              name="nickname"
              onChange={handleOnChangeName}
            />
            <button className={style.checkIdBtn} onClick={handleCheckName}>
              중복체크
            </button>
          </div>
          <div style={{ color: nameMsgColor, textAlign: "center" }}>
            {nicknameMsg}
          </div>

          {/* 전화번호 입력란 */}
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
              value={phoneNumber}
              name="phoneNumber"
              onChange={handleOnChangePhonNumber}
            />
          </div>
          <div style={{ color: phoneNumberMsgColor, textAlign: "center" }}>
            {phoneNumberMsg}
          </div>

          {/* 회원가입 완료 버튼 */}
          <div className={style.signupBtn}>
            <LargeButton onClick={hadleSignupComp}>회원가입 완료</LargeButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
