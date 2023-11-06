import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>Login</div>
      <Link to="/member/signup">회원가입</Link>
    </>
  );
}

export default Login;
