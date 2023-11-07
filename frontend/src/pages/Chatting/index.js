import { Routes, Route } from "react-router-dom";
import ChattingList from "./ChattingList/index";
import Chatroom from "./Chatroom/index";
import WriteForm from "./WriteForm/index";

function Chatting(props) {
  // 고객의 비대면 진단 페이지.
  // 채팅목록/채팅방/글작성. 총 3개 페이지로 구성.
  // 고객이 정비소와 채팅을 하는 것이기에 url에 정비소 id(cno)를 포함한다.
  
  return (
    <Routes>
      <Route path="" Component={ChattingList} />
      <Route path="chatroom/:cno" Component={Chatroom}/>
      <Route path="writeform/:cno" Component={WriteForm}/>        
    </Routes>
  );
}

export default Chatting;
