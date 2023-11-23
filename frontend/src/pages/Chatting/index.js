import { Routes, Route } from "react-router-dom";
import ChattingList from "./ChattingList/index";
import Chatroom from "./Chatroom/index";
import WriteForm from "./WriteForm/index";
import ChatroomInfo from "./ChatroomInfo";

function Chatting(props) {
  // 고객의 비대면 진단 페이지.
  // 채팅목록/채팅방정보/채팅방/글작성. 총 4개 페이지로 구성.
  
  return (
    <Routes>
      <Route path="" Component={ChattingList} /> {/* 채팅방목록 */}
      <Route path="chatroominfo" Component={ChatroomInfo} /> {/* 채팅방목록 */}
      <Route path="chatroom" Component={Chatroom}/> {/* 채팅방 */}
      <Route path="writeform" Component={WriteForm}/> {/* 글작성 */}
    </Routes>
  );
}

export default Chatting;
