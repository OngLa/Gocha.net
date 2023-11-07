import { Routes, Route } from "react-router-dom";
import ChattingList2 from "./ChattingList2/index";
import Chatroom2 from "./Chatroom2/index";
import WriteForm2 from "./WriteForm2/index";


// http://localhost:3000/chatting/chatroom2/1?userName=%EA%B9%80%EC%A7%80%EC%84%A0
function Chatting2(props) {
  return (
    <Routes>
      <Route path="" Component={ChattingList2} />
      <Route path="chatroom2/:uno" Component={Chatroom2} />
      <Route path="writeform2/:uno" Component={WriteForm2} />
    </Routes>
  );
}

export default Chatting2;
