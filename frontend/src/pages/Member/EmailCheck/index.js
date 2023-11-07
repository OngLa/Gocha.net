import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./emailCheck.module.css"
import LargeButton from "../../../components/Button";

function EmailCheck() {
  
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/member/signup');
  }
  
  const [EmailCheckApplyResult, setEmailCheckApplyResult] = useState(''); 

  const EmailCheckApply = () => {
    
  };

  const [EmailCheckResult, setEmailCheckResult] = useState(''); 

  const EmailCheckNum = () => {
    
  };


  
  return(
  <>
  <div className={style.pageInfo}>
    <Link to="/"><img src ="/memberIcon/back.png" alt="뒤로가기" /></Link>
    <span>회원가입</span>
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
        // value={member.email}
        // onChange={e => {
        //   onChange(e)
        // }}
      />
    </div>
    <div className={style.result}>{EmailCheckApplyResult}</div>
    <div className={style.EmailCheckApplyBtn}>
      <LargeButton onClick={EmailCheckApply}>인증요청</LargeButton>
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
        // value={member.email}
        // onChange={e => {
        //   onChange(e)
        // }}
      />
      <button className={style.EmailCheckNumBtn} onClick={EmailCheckNum}>확인</button> 
    </div>
    <div className={style.result}>{EmailCheckResult}</div>
    <div className={style.nextBtn}>
      <LargeButton onClick={onClick}>다음</LargeButton>
    </div>
  </div>
  </>
  )
}

export default EmailCheck;