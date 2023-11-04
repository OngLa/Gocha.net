import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function Member(props) {
  return (
    <Routes>
      <Route path="" Component={Login} />
      <Route path="login" Component={Login} />
      <Route path="signup" Component={Signup} />
    </Routes>
  );
}

export default Member;
