import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import ContentHeader from "../../../components/ContentHeader";
import { useCallback, useEffect, useState } from "react";
import LargeButton, {
  SmallButton,
  SmallButton2,
} from "../../../components/Button";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";
import { useDispatch, useSelector } from "react-redux";
import { addAuthHeader } from "../../../service/axiosConfig";
import {
  setUser as gSetUser,
  setRole as gSetRole,
  setAccessToken,
} from "../../../redux/authReducer";
import { login } from "../../../service/auth";
import Swal from "sweetalert2";

function Login() {
  // 로그인 페이지
  // ㄴ로그인 & 토큰 생성 및 localstorage/redux등록
  // ㄴ비밀번호 찾기 페이지 이동

  const navigate = useNavigate();

  // Login Page Input
  const [member, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 시 user, role, token을 redux에 등록시켜주기 위해 dispatch 생성.
  const dispatch = useDispatch();
  // 로그인 시 console에 email, role을 찍어주기 위해 Redux에서 user, role을 받아옴.
  const gUser = useSelector((state) => state.authReducer.user);
  const gRole = useSelector((state) => state.authReducer.role);

  //로그인 시 Redux에 로그인 정보(email, role)가 수정되면 console에서 확인.
  useEffect(() => {
    console.log("Login Result = email: " + gUser + " / role: " + gRole);
  }, [gUser, gRole]);

  // 로그인 버튼 클릭 시 handle
  const handleLogin = useCallback(async (event) => {
    // 항목 전부 입력해야 회원가입 가능
    if (!member.email || !member.password) {
      return alert("모든 항목을 입력해주세요.");
    } else {
      try {
        // axios 로그인 요청
        const response = await login(member);

        //요청 공통 헤더인 Authorization 추가
        addAuthHeader(response.data.accessToken);

        //Rudux에 인증 내용 저장
        dispatch(gSetUser({ user: response.data.email }));
        dispatch(gSetRole({ role: response.data.role }));
        dispatch(setAccessToken({ accessToken: response.data.accessToken }));

        //상태 재초기화(input값 비워주기)
        setUser({
          email: "",
          password: "",
        });

        //Alert 이쁘게
        Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",

          icon: "success",
          text: "로그인이 완료되었습니다.",
          confirmButtonText: "확인",
        });
        navigate("/");
      } catch (error) {
        console.log(error);

        return Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
  
          text: "아이디 또는 비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }
  });

  return (
    <div>
      <ContentHeader menuName="로그인"></ContentHeader>
      <div className={style.memberBox}>
        <div className={style.imgWrap}>
          <img src={emailIcon} alt="emailIcon" className={style.memberImg} />
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
          value={member.password}
          name="password"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>

      <div className={style.searchPw}>
        <Link to="/member/findpw">
          <SmallButton2
            children="비밀번호 찾기"
            style={{ width: "130px" }}
          ></SmallButton2>
        </Link>
      </div>

      <div className={style.LargeButtonWrap}>
        <LargeButton children="로그인" onClick={handleLogin}></LargeButton>
      </div>
      <div>
        <div className={style.signupLinkBox}>
          아이디가 없으신분은
          <Link to="/member/emailCheck" className={style.signupLink}>
            회원가입
          </Link>
          후 이용해 주세요.
        </div>
      </div>
    </div>
  );
}

export default Login;
