import LargeButton from "../../../components/Button";
import style from "./signup.module.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";
import confirmPasswordIcon from "../../../img/member/password.png";
import nicknameIcon from "../../../img/member/nickname.png";
import phoneIcon from "../../../img/member/phone.png";
import Swal from "sweetalert2";
import { createMember, nameCheck } from "../../../service/member";

function Signup() {
  // React Router의 navigate 훅을 사용하기 위한 초기 설정
  const navigate = useNavigate();

  // 각 항목의 초기 상태 설정
  const [email, setEmail] = useState("test1@test.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
  const [confirmPwdMsgColor, setConfirmPwdMsgColor] = useState("");
  const [phoneNumberMsgColor, setPhoneNumberMsgColor] = useState("");
  const isPwdValid = validatePwd(password);
  const isconfirmPwdValid = password === confirmPassword;
  const isNameValid = validateName(nickname);
  const isPhoneNumber = password.length === 13;

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
    } else {
      setPwdMsg("사용 가능한 비밀번호입니다.");
    }
  }, []);

  // 비밀번호 확인
  const handleOnChangeConfirmPwd = useCallback(
    (e) => {
      const curConfirmPwd = e.target.value;
      setConfirmPassword(curConfirmPwd);

      if (curConfirmPwd !== password) {
        setconfirmPwdMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        setConfirmPwdMsgColor("red");
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

    if (!validateName(curNickname)) {
      setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.(특수 문자 제외)");
    } else {
      setNicknameMsg("사용 가능한 닉넴임입니다.");
    }
  }, []);

  // 전화번호
  const handleOnChangePhonNumber = (e) => {
    const curPhoneNumber = e.target.value;
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(curPhoneNumber)) {
      setPhoneNumber(curPhoneNumber);
      setPhoneNumberMsg("사용 가능한 전화번호입니다.");
      setPhoneNumberMsgColor("green");
    } else {
      setPhoneNumberMsg("올바른 전화번호 형식이 아닙니다.");
      setPhoneNumberMsgColor("red");
    }
  };

  // 전화번호 자동 하이픈 설정
  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneNumber]);

  // 닉네임 중복 검사
  const handleCheckName = async (event) => {
    event.preventDefault();

    try {
      if (nickname === "") {
        setNicknameMsg("닉네임을 입력해주세요.");
      } else {
        await nameCheck(nickname);

        setNicknameMsg("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      setNicknameMsg("이미 사용 중인 닉네임입니다.");
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
      };

      const response = await createMember(requestData);

      console.log("회원가입 성공: ", response.data);
    } catch (error) {
      console.error("회원가입 실패: ", error.response.data);
    }
  };

  // 회원 가입 완료 버튼 클릭 시 실행
  const hadleSignupComp = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword || !nickname || !phoneNumber) {
      return Swal.fire({
        icon: "warning",
        title: "모든 항목을 입력해주세요.",
        confirmButtonColor: "#45CB85",
      });
    } else if (
      !isPwdValid ||
      !isconfirmPwdValid ||
      !isNameValid ||
      !isPhoneNumber
    ) {
      return Swal.fire({
        icon: "warning",
        title: "일치하지 않은 항목이 있습니다.",
        html: "- 비밀번호: 영문, 숫자, 특수기호 조합으로 8자리 이상 입력해 주세요.<br>- 닉네임: 1글자 이상 9글자 미만으로 입력해 주세요.(특수 문자 제외)<br>- 전화번호: 휴대전화번호가 정확한지 확인해 주세요.",
        confirmButtonColor: "#45CB85",
        width: 600,
      });
    } else {
      handleSubmit();

      Swal.fire({
        icon: "success",
        title: "회원가입이 완료되었습니다.",
        confirmButtonColor: "#45CB85",
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
          <div className={validatePwd(password) ? style.valid : style.invalid}>
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
          <div className={validateName(nickname) ? style.valid : style.invalid}>
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
