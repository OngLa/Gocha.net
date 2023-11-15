import { useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import style from "./editPw.module.css";
import LargeButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import passworIcon from "../../../img/member/password.png";
import confirmPasswordIcon from "../../../img/member/password.png";

function EditPw() {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditComplete = async (event) => {
    // 항목 전부 입력해야 수정 가능
    if (!member.password || !member.confirmPassword) {
      return alert("모든 항목을 입력해주세요.");
    } else if (member.password !== member.confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert("수정이 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div>
      <ContentHeader menuName="로그인"></ContentHeader>
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
          value={member.password}
          name="password"
          onChange={(e) => {
            onChange(e);
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
            onChange(e);
          }}
        />
      </div>
      <div className={style.LargeButtonWrap}>
        <LargeButton children="수정완료" onClick={handleEditComplete}></LargeButton>
      </div>
    </div>
  );
}

export default EditPw;
