import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./passwordEdit.module.css";
import LargeButton from "../../../components/Button";
import ContentHeader from "../../../components/ContentHeader";


function PasswordEdit() {
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    changePassword: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  const handleEditComplete = () => {
    navigate("/member/mypage");
  }

  return (
    <>
      <div className={style.menu}>
        <ContentHeader menuName="비밀번호 수정" />
      </div>
      <div className={style.passwordEditWrap}>
        <div className={style.passwordEditBox}>
          <img
            src="/memberIcon/password.png"
            alt="passwordImg"
            className={style.passwordEditImg}
          />
          <input
            className={style.passwordEditInput}
            type="password"
            placeholder="변경 비밀번호"
            name="changePassword"
            value={password.changePassword}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        
        <div className={style.passwordEditBox}>
          <img
            src="/memberIcon/password.png"
            alt="passwordImg"
            className={style.passwordEditImg}
          />
          <input
            className={style.passwordEditInput}
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div className={style.EditCompleteBtn}>
          <LargeButton onClick={handleEditComplete}>수정완료</LargeButton>
        </div>
      </div>
    </>
  );
}

export default PasswordEdit;
