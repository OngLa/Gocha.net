import { useCallback, useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import style from "./showEditPw.module.css";
import LargeButton from "../../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import passworIcon from "../../../img/member/password.png";
import confirmPasswordIcon from "../../../img/member/password.png";
import Swal from "sweetalert2";
import { editPw } from "../../../service/member";

// 비밀번호 수정 컴포넌트
function ShowEditPw() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state && location.state.email;

  // 각 항목의 초기 상태 설정
  const [veriEmail, setVeriEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 유효성 검사 함수
  
  const validatePwd = (password) => {
    return password.match(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
    );
  };

  // 상태 및 유효성 검사 결과를 저장하는 변수들
  const [confirmPwdMsgColor, setConfirmPwdMsgColor] = useState("");

  // 각 항목에 대한 유효성 검사 메시지를 저장하는 변수들
  const [PwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setconfirmPwdMsg] = useState("");

  // 변경 이벤트 핸들러
  // 비밀번호 입력 핸들러
  const handleOnChangePwd = useCallback((e) => {
    const curPwd = e.target.value;
    setPassword(curPwd);

    // 유효성 검증 및 메시지 설정
    if (!validatePwd(curPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
    } else {
      setPwdMsg("사용 가능한 비밀번호입니다.");
    }
  }, []);

  // 비밀번호 확인 입력 핸들러
  const handleOnChangeConfirmPwd = useCallback(
    (e) => {
      const curConfirmPwd = e.target.value;
      setConfirmPassword(curConfirmPwd);

      // 비밀번호 확인 및 메시지 설정
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

  // 수정 완료 버튼 클릭 핸들러
  const handleEditComplete = async () => {
    try {
      // 항목 전부 입력해야 수정 가능
      if (!password || !confirmPassword) {
        Swal.fire({
          icon: "warning",
          title: "모든 항목을 입력해주세요.",
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",
        });
      } else if (password !== confirmPassword) {
        Swal.fire({
          icon: "warning",
          title: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",
        });
      } else {
        // 서버에 비밀번호 변경 요청
        const requestData = {
          email: veriEmail,
          password: password,
        };
        await editPw(requestData);

        // 성공적으로 변경되면 메시지 출력 및 홈페이지로 이동
        Swal.fire({
          icon: "success",
          title: "비밀번호가 변경되었습니다.",
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",
        });

        navigate("/");
      }
    } catch (error) {
      // 비밀번호 변경 실패 시 오류 메시지 출력
      Swal.fire({
        icon: "warning",
        title: "비밀번호 변경에 실패하였습니다.",
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",
      });
    }
  };

  return (
    <div>
      {/* 페이지 상단에 위치하는 콘텐츠 헤더 */}
      <ContentHeader menuName="비밀번호 변경"></ContentHeader>

      {/* 비밀번호 입력 부분 */}
      <div className={style.memberBox}>
        <div className={style.imgWrap}>
          <img
            src={passworIcon}
            alt="passworIcon"
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

      {/* 비밀번호 확인 입력 부분 */}
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

      {/* 수정 완료 버튼 */}
      <div className={style.LargeButtonWrap}>
        <LargeButton
          children="수정완료"
          onClick={handleEditComplete}
        ></LargeButton>
      </div>
    </div>
  );
}

export default ShowEditPw;
