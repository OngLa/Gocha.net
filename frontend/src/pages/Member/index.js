import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import EmailCheck from "./EmailCheck";
import Mypage from "./Mypage"
import EditPw from "./EditPw";
import FindPw from "./FindPw";

function Member(props) {
  return (
    <Routes>
      <Route path="" Component={Login} />
      <Route path="login" Component={Login} />
      <Route path="signup" Component={Signup} />
      <Route path="emailCheck" Component={EmailCheck} />
      <Route path="mypage" Component={Mypage} />
      <Route path="editpw/*" Component={EditPw} />
      <Route path="findpw/*" Component={FindPw} />
    </Routes>
  );
}

export default Member;
