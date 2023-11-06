import { Routes, Route } from "react-router-dom";
import ChattingList from "./ChattingList/index";
import Chatroom from "./Chatroom/index";
import WriteForm from "./WriteForm/index";

function Chatting(props) {
  return (
    <Routes>
      <Route path="" Component={ChattingList} />
      <Route path="writeform/:cno" Component={WriteForm}/>        
      <Route path="chatroom/:cno" Component={Chatroom}/>
    </Routes>
  );
}

export default Chatting;
