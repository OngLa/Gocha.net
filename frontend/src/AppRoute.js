import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Chatting from "./pages/Chatting";
import Reservation from "./pages/Reservation";

// function Approute() {} 이랑 아래 에로우 함수랑 같다.
const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatting/*" element={<Chatting />} />
        {/* <Route path="/reservation/*" element={<Chatting />} /> */}
        {/* <Route path="/cardata/*" element={<Chatting />} /> */}
        {/* <Route path="/carinfo/*" element={<Chatting />} /> */}
        {/* <Route path="/parts/*" element={<Chatting />} /> */}
        <Route path="/Reservation/*" element={<Reservation/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
