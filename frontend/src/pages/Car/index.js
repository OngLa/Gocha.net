import { Route, Routes } from "react-router-dom";
import DataList from "./DataList";
import Info from "./Info";

function Car() {
  return (
    <div>
      <Routes>
        <Route path="data-list" Component={DataList} />
        <Route path="info" Component={Info} />
      </Routes>
    </div>
  );
}

export default Car;
