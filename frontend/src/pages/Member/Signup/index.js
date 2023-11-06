import { Link, useNavigate } from "react-router-dom";
import LargeButton from "../../../components/Button";
import style from "./signup.module.css"
import { useState } from "react";
// import axios from 'axios';

function Signup() {

  const navigate = useNavigate();

  const [member, setMember] = useState({
    email: '',
    password: '',
    ConfirmPassword: '',
    nickname: '',
    phoneNumber: '',
  })

  const onChange = (e) => {
    // state값을 입력값으로 변경 
      setMember({
        ...member,
        [e.target.name]: e.target.value
      }); 
    }

  const [nicknameCheckResult, setNicknameCheckResult] = useState(''); // 상태 추가

  const checkId = async () => {
    // // 닉네임 중복체크를 서버에 요청하고 결과를 받아오는 비동기 작업
    // try {
    //   // 가짜 요청 대신 실제 서버 요청을 수행해야 합니다.
    //   // 아래의 예시는 가짜 응답을 사용합니다.
    //   // 실제 응답은 서버로부터 받아온 값에 따라 설정합니다.
    //   const response = await fetch('/api/checkNickname', {
    //     method: 'POST',
    //     body: JSON.stringify({ nickname: member.nickname }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   const result = await response.json();

    //   if (result.isAvailable) {
    //     setNicknameCheckResult('닉네임 사용 가능');
    //   } else {
    //     setNicknameCheckResult('사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요.');
    //   }
    // } catch (error) {
    //   console.error('닉네임 중복 체크 중 오류 발생:', error);
    //   setNicknameCheckResult('닉네임 중복 체크 중 오류 발생');
    // }
  };
  
  const onClick = async (event) => {
    // 항목 전부 입력해야 회원가입 가능
    if (!member.email || !member.password || !member.ConfirmPassword|| !member.nickname|| !member.phoneNumber) {
      return alert("모든 항목을 입력해주세요.");
    }

    if (member.password !== member.ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }  
    else {
      // return alert("회원가입 성공!");
      navigate('member/login');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      // 사용자의 폼 데이터
      const formData = {
        email: member.email,
        password: member.password,
        ConfirmPassword: member.ConfirmPassword,
        nickname: member.nickname,
        phoneNumber: member.phoneNumber,
      };
    };
  
  return (
    <>
    <div className={style.pageInfo}>
    <Link to="/"><img src ="/memberIcon/back.png" alt="뒤로가기" /></Link>
    <span>회원가입</span>
    </div>
    <div className={style.memberWrap}>
      <form onSubmit={handleSubmit}>
        <div className={style.memberBox}>
          <img
            src="/memberIcon/email.png"
            alt="emailImg"
            className={style.memberImg}
          />
          <input 
            className={style.memberInput} 
            type="email" 
            placeholder="이메일"
            value={member.email}
            name="email"
            onChange={e => {
              onChange(e)
            }}
          />
        </div>
        <div className={style.memberBox}>
          <img
            src="/memberIcon/password.png" 
            alt="passworImg"
            className={style.memberImg}
          />
          <input
            className={style.memberInput} 
            type="password" placeholder="비밀번호"
            value={member.password}
            name="password"
            onChange={e => {
              onChange(e)
            }}
          />
        </div>
        <div className={style.memberBox}>
          <img
            src="/memberIcon/password.png"
            alt="ConfirmPasswordImage"
            className={style.memberImg}
          />
          <input
            className={style.memberInput} 
            type="password" placeholder="비밀번호 확인"
            value={member.ConfirmPassword}
            name="ConfirmPassword"
            onChange={e => {
              onChange(e)
            }}   
          />
        </div>
        <div className={style.memberBox}>
          <img
            src="/memberIcon/nickname.png"
            alt="nicknameImg"
            className={style.memberImg}
          />
          <input
            className={style.memberInput} 
            type="text" placeholder="닉네임"
            value={member.nickname}
            name="nickname"
            onChange={e => {
              onChange(e)
            }}  
          />
          <button className={style.checkIdBtn} onClick={checkId}>중복체크</button> 
        </div>
        <div className={style.nicknameCheckResult}>{nicknameCheckResult}</div>
        <div className={style.memberBox}>
          <img
            src="/memberIcon/phone.png"
            alt="phoneImg"
            className={style.memberImg}
          />
          <input
            className={style.memberInput} 
            type="text" placeholder="전화번호"
            value={member.phoneNumber}
            name="phoneNumber"
            onChange={e => {
              onChange(e)
            }}
          />
        </div>
        <div className={style.signupBtn}>
          <LargeButton onClick={onClick}>회원가입 완료</LargeButton>
        </div>
      </form>
    </div>
    </>
  );
}
      

export default Signup;
