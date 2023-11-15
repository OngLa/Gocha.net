import { Route, Routes } from "react-router-dom";
import DataList from "./DataList";
import Info from "./Info";
import CarRegister from "./CarRegister";

function Car() {
  return (
    <div>
      <Routes>
        <Route path="data-list" Component={DataList} />
        <Route path="info" Component={Info} />
        <Route path="registration" Component={CarRegister} />
      </Routes>
    </div>
  );
}

export default Car;
