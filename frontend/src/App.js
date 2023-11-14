import "./App.css";
import AppHeader from "./components/HeaderNav/AppHeader";
import AppRoute from "./AppRoute";
import AppNav from "./components/HeaderNav/AppNav";
import AppNavHome2 from "./components/HeaderNav/AppNavHome2";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const gRole = useSelector((state) => state.authReducer.role);

  useEffect(() => {
    console.log("role: " + gRole);
  });

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
          <AppNav />
        </div>
      ) : (
        <div>
          <AppNavHome2 />
        </div>
      )}
    </div>
  );
}

export default App;
