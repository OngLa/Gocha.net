import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chatting from "./pages/Chatting";
import Reservation from "./pages/Reservation";
import Car from "./pages/Car";
import Member from "./pages/Member";
import ReservationAdmin from "./pages/ReservationAdmin";
import Chatting2 from "./pages/Chatting2";
import { useSelector } from "react-redux";
import Loading from "./pages/Loading";

const AppRoute = () => {
  // 권한(role)에 따라 잘못된 접근을 막기 위해 redux에서 role 가져옴
  const gRole = useSelector((state) => state.authReducer.role);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/*" element={<Member />} />
        <Route path="*" element={<Navigate to="/" />} />
        {gRole === "ROLE_CARCENTER" || gRole === "ROLE_USER" ? (
          <>
            <Route path="/chatting/*" element={<Chatting />} />
            <Route path="/chatting2/*" element={<Chatting2 />} />
            <Route path="/car/*" element={<Car />} />
            <Route path="/reservation/*" element={<Reservation />} />
            <Route path="/reservationadmin/*" element={<ReservationAdmin />} />
            <Route path="/parts" element={<Loading />} />
          </>
        ) : (
          <>
            <Route
              path="/chatting/*"
              element={<Navigate to={`/member/login?redirect=${1}`} />}
            />
            <Route
              path="/chatting2/*"
              element={<Navigate to={`/member/login?redirect=${1}`} />}
            />
            <Route path="/car/*" element={<Navigate to={`/member/login?redirect=${1}`} />} />
            <Route
              path="/reservation/*"
              element={<Navigate to={`/member/login?redirect=${1}`} />}
            />
            <Route
              path="/reservationadmin/*"
              element={<Navigate to={`/member/login?redirect=${1}`} />}
            />
            <Route path="/parts" element={<Navigate to={`/member/login?redirect=${1}`} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoute;
