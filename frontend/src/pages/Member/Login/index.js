import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import ContentHeader from "../../../components/ContentHeader";
import { useCallback, useEffect, useState } from "react";
import LargeButton, { SmallButton } from "../../../components/Button";
import emailIcon from "../../../img/member/email.png";
import passwordIcon from "../../../img/member/password.png";
import { useDispatch, useSelector } from "react-redux";
import { addAuthHeader, removeAuthHeader } from "../../../service/axiosConfig";
import { setUser as gSetUser, setRole as gSetRole, setAccessToken } from "../../../redux/authReducer";
import { login } from "../../../service/auth";

function Login() {
  const navigate = useNavigate();

  const [member, setUser] = useState({
    email: "",
    password: "",
  });

  //Redux 이용
  const dispatch = useDispatch();
  const gUser = useSelector((state) => state.authReducer.user);
  const gRole = useSelector((state) => state.authReducer.role);

  const onChange = (e) => {
    setUser({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPw = async (event) => {
    navigate("/member/editpw");
  };

  const handleLogin = useCallback(async (event) => {
    // 항목 전부 입력해야 회원가입 가능
    if (!member.email || !member.password) {
      return alert("모든 항목을 입력해주세요.");
    } else {
      try {
        //로그인 요청
        const response = await login(member);

        //요청 공통 헤더인 Authorization 추가
        addAuthHeader(response.data.accessToken);

        //Rudux에 인증 내용 저장
        dispatch(gSetUser({ member: response.data.email }));
        dispatch(gSetRole({ role: response.data.role }));
        dispatch(setAccessToken({ accessToken: response.data.accessToken }));

        //상태 재초기화
        setUser({
          email: "",
          password: "",
        });

        alert("로그인이 완료되었습니다.");
        navigate("/");

      } catch (error) {
        console.log(error);
        return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  });

  //로그인 후 Redux에 로그인 정보(email, role)을 업데이트하고 console에서 확인.
  useEffect(() => {
    console.log("Login Result = email: " + gUser + " / role: " + gRole);
  }, [gUser, gRole]);

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

      <div className={style.tempButton}>
        <Link to="/member/findpw">
          <SmallButton
            children="비밀번호 찾기"
            style={{ width: "110px" }}
          ></SmallButton>
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
        <div><Link to="/member/mypage">마이페이지</Link></div>
        {/* <div className={style.tempButton}>
        <Link to="/member/mypage"><SmallButton
            children="마이페이지"
            style={{ width: "110px" }}
          ></SmallButton></Link>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
