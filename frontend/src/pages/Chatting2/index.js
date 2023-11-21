import { Routes, Route } from "react-router-dom";
import ChattingList2 from "./ChattingList2/index";
import Chatroom2 from "./Chatroom2/index";
import WriteForm2 from "./WriteForm2/index";


function Chatting2(props) {
  // Chatting2 : 카센터 전용 비대면 진단 페이지.
  return (
    <Routes>
      <Route path="" Component={ChattingList2} /> {/* 채팅방목록 */}
      <Route path="chatroom2" Component={Chatroom2} /> {/* 채팅방 */}
      <Route path="writeform2" Component={WriteForm2} /> {/* 글작성 */}
    </Routes>
  );
}

export default Chatting2;
