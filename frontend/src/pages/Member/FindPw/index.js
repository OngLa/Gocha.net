import { Routes, Route } from "react-router-dom";
import ShowPw from "./ShowPw";
import FindPwPage from "./FindPwPage";

function FindPw(props) {
  // 고객의 비대면 진단 페이지.
  // 채팅목록/채팅방/글작성. 총 3개 페이지로 구성.
  // 고객이 정비소와 채팅을 하는 것이기에 url에 정비소 id(cno)를 포함한다.
  
  return (
    <Routes>
      <Route path="" Component={FindPwPage} />
      <Route path="showpw" Component={ShowPw}/>
    </Routes>
  );
}

export default FindPw;
