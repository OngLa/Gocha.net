import { Routes, Route } from "react-router-dom";
import ChattingList from "./ChattingList";

function Chatting(props) {
  return (
    <Routes>
      <Route path="" Component={ChattingList} />
      {/* <Route path="writeForm" Component={BoardWriteForm}/>         */}
      {/* <Route path=":bno/read" Component={BoardRead}/> */}
    </Routes>
  );
}

export default Chatting;
