import { Route, Routes } from "react-router-dom";
import Home from "./Home";


function ReservationAdmin (){
  return(
    <div>
          <Routes>
            <Route path="/" Component={Home}/>
          </Routes>
    </div>
  );
}
export default ReservationAdmin