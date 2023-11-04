import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Chatting from "./pages/Chatting";
import Car from "./pages/Car";

// function Approute() {} 이랑 아래 에로우 함수랑 같다.
const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatting/*" element={<Chatting />} />
        {/* <Route path="/reservation/*" element={<Chatting />} /> */}
        <Route path="/car/*" element={<Car />} />
        {/* <Route path="/carinfo/*" element={<Chatting />} /> */}
        {/* <Route path="/parts/*" element={<Chatting />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
   
  );
};

export default AppRoute;
