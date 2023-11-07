import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chatting from "./pages/Chatting";
import Reservation from "./pages/Reservation";
import Car from "./pages/Car";
import Member from "./pages/Member";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/chatting/*" element={<Chatting />} />
        {/* <Route path="/reservation/*" element={<Chatting />} /> */}
        <Route path="/car/*" element={<Car />} />
        {/* <Route path="/carinfo/*" element={<Chatting />} /> */}
        {/* <Route path="/parts/*" element={<Chatting />} /> */}
        <Route path="/Reservation/*" element={<Reservation/>} />
        <Route path="/member/*" element={<Member />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
