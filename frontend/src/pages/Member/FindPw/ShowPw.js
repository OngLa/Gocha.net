import style from "./showPw.module.css"

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LargeButton from "../../../components/Button";

function ShowPw() {
  const [searchParams] = useSearchParams();
  let pw = searchParams.get("pw");


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

  const handleToHome = () => {
    navigate("/");
  }

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
    <div className={style.showPwWrap}>
      <div className={style.pwWrap}><div>비밀번호는 아래와 같습니다.</div></div>
      <div className={style.pw}><div>{pw}</div></div>
      <div><LargeButton children="메인으로 돌아가기" onClick={handleToHome}/></div>
    </div>
  );
}

export default ShowPw;
