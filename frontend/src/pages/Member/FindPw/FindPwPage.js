import React, { useState } from "react";
import style from "./findPwPage.module.css";
import LargeButton, { SmallButton, SmallButton2 } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";

function FindPwPage() {
  const navigate = useNavigate();
  const [showCheckCodeBlock, setShowCheckCodeBlock] = useState(false);
  const [member, setMember] = useState({
    email: "",
    checkcode: "",
  });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendCheckCode = async (event) => {
    alert("인증코드가 발송되었습니다.");
    setShowCheckCodeBlock(true); // 인증번호 블록을 보여주기 위한 상태 변경
  };

  let pw = "12341234"; // test 비밀번호
  const handleFindPw = async (event) => {
    // 항목 전부 입력해야 회원가입 가능
    if (!member.email || !member.checkcode) {
      return alert("모든 항목을 입력해주세요.");
    } else if (member.checkcode !== "12341234") {
      return alert("인증번호가 일치하지 않습니다.");
    } else {
      navigate(`/member/findpw/showpw?pw=${pw}`);
    }
  };

  return (
    <div>
      <ContentHeader menuName="비밀번호 찾기"></ContentHeader>
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
          value={member.email}
          name="email"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <div className={style.SmallButtonWrap}>
        <SmallButton2
          children="인증번호 발송"
          onClick={handleSendCheckCode}
          style={{ width: "130px" }}
        ></SmallButton2>
      </div>
      {showCheckCodeBlock && ( // 인증번호 블록 보여주기
        <div className={style.memberBox}>
          <div className={style.imgWrap}>
            <img
              src={passwordIcon}
              alt="passworIcon"
              className={style.memberImg}
            />
          </div>
          <input
            className={style.memberInput}
            type="checkcode"
            placeholder="인증번호"
            value={member.checkcode}
            name="checkcode"
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
      )}
      <div className={style.LargeButtonWrap}>
        <LargeButton children="비밀번호 찾기" onClick={handleFindPw}></LargeButton>
      </div>
    </div>
  );
}

export default FindPwPage;
