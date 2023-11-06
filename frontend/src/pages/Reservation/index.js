// import { useState } from "react";
import { Route, Routes } from "react-router";
import ReservationList from "./ReservationList";
import Sidepanel from "./Sidepanel";
import MainRepairshop from "./MainRepairshop";
import Home from "./Home";


function Reservation() {



  return (
    <div>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="sidepanel" Component={Sidepanel}/>
            <Route path="reservationList" Component={ReservationList}/>
            <Route path="mainRepairshop" Component={MainRepairshop}/>

          </Routes>
    </div>
    );
}

export default Reservation;