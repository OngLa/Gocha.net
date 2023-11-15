import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Opinionpage from "./Opinionpage";
import Refusepage from "./Refusepage";
import UserFilter from "./UserFilter";


function ReservationAdmin (){
  return(
    <div>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="opinionpage" Component={Opinionpage}/>
            <Route path="refusepage" Component={Refusepage}/>
            <Route path="usefilter" Component={UserFilter}/>
          </Routes>
    </div>
  );
}
export default ReservationAdmin