import "./App.css";
import AppHeader from "./components/HeaderNav/AppHeader";
import AppRoute from "./AppRoute";
import AppNav from "./components/HeaderNav/AppNav";
import AppNavHome2 from "./components/HeaderNav/AppNavHome2";
import { useSelector } from "react-redux";
import { addAuthHeader } from "./service/axiosConfig";

function App() {
  // 브라우저에서 리프레쉬 또는 재시작했을 경우 헤더 유지되도록 함.
  const accessToken = localStorage.getItem("accessToken") || "";
  if(accessToken !== "") {
    addAuthHeader(accessToken);
  }

  // 권한(role)에 따라 Nav변경해주기 위해 redux에서 role 가져옴
  const gRole = useSelector((state) => state.authReducer.role);

  return (
    <div className="App">
      <div>
        <AppHeader />
      </div>
      <div className="AppRouteWrap">
        <AppRoute />
      </div>
      {gRole !== "ROLE_CARCENTER" ? (
        <div>
          {/* User Nav */}
          <AppNav />
        </div>
      ) : (
        <div>
          {/* Carcenter Nav */}
          <AppNavHome2 />
        </div>
      )}
      {/* <TouchEffect/> */}
    </div>
  );
}

export default App;
