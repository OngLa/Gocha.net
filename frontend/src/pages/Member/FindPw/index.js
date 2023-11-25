import { Routes, Route } from "react-router-dom";
import FindPwPage from "./FindPwPage";

function FindPw(props) {
  
  return (
    <Routes>
      <Route path="" Component={FindPwPage} />
    </Routes>
  );
}

export default FindPw;
