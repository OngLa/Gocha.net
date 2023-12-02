import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import EmailCheck from "./EmailCheck";
import Mypage from "./Mypage";
import EditPw from "./EditPw";
import FindPw from "./FindPw";
import { useSelector } from "react-redux";
import LoadingLogin from "./Login/LoadingLogin";

function Member(props) {
  // 권한(role)에 따라 잘못된 접근을 막기 위해 redux에서 role 가져옴
  const gRole = useSelector((state) => state.authReducer.role);

  return (
    <Routes>
      <Route path="" Component={Login} />
      <Route path="login" Component={Login} />
      <Route path="signup" Component={Signup} />
      <Route path="emailcheck" Component={EmailCheck} />
      <Route path="editpw/*" Component={EditPw} />
      <Route path="findpw/*" Component={FindPw} />
      {gRole === "ROLE_CARCENTER" || gRole === "ROLE_USER" ? (
        <Route path="mypage" Component={Mypage} />
      ) : (
        <Route path="mypage" element={<Navigate to="/member/login" />} />
      )}
      <Route path="/login-success" element={<LoadingLogin />} />
    </Routes>
  );
}

export default Member;
