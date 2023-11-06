import { Route, Routes } from "react-router-dom";
import DataList from "./DataList";

function Car() {
  return (
    <div>
      <Routes>
        <Route path="data-list" Component={DataList} />
      </Routes>
    </div>
  );
}

export default Car;
