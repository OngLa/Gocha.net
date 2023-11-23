import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserFilter from "./UserFilter";


function ReservationAdmin (){
  return(
    <div>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="usefilter" Component={UserFilter}/>
          </Routes>
    </div>
  );
}
export default ReservationAdmin