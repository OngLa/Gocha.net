import { Link } from "react-router-dom";
import LargeButton from "../../../components/Button";
import style from "./Signup.module.css"

function Signup() {
  const onClick = (event) => {
    console.log("회원가입 완료");
  };

  return (
    <>
    <div className={style.pageInfo}>
    <Link to="/"><img src ="/memberIcon/back.png" alt="뒤로가기" /></Link>
    <span>회원가입</span>
    </div>

    <div className={style.memberInfo}>
      <div className={style.box}>
        <img
          src="/memberIcon/id.png"
          alt="아이디 이미지"
          style={{margin: "0px 10px"}}
        />
        <input type="text" placeholder="아이디" />
      </div>
      <div className={style.box}>
        <img src="/memberIcon/password.png" alt="비밀번호 이미지" />
        <input type="text" placeholder="비밀번호" />
      </div>
      <div className={style.box}>
        <img src="/memberIcon/password.png" alt="비밀번호 이미지" />
        <input type="text" placeholder="비밀번호 확인"></input>
      </div>
      <div className={style.box}>
        <img src="/memberIcon/phone.png" alt="전화번호 이미지" />
        <input type="text" placeholder="전화번호"></input>
      </div>
      <div className={style.box}>
        <LargeButton name="signBtn" onClick={onClick}>회원가입 완료</LargeButton>
      </div>
    </div>
    </>
  );
}

export default Signup;
