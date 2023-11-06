import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>Login</div>
      <div><Link to="/member/emailCheck">회원가입</Link></div>
      <div><Link to="/member/mypage">마이페이지</Link></div>
    </>
  );
}

export default Login;
