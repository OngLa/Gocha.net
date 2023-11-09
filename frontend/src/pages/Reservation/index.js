// import { useState } from "react";
import { Route, Routes } from "react-router";
import ReservationList from "./ReservationList";
import RepairshopList from "./RepairshopList";
import MainRepairshop from "./MainRepairshop";

function Reservation() {



  return (
    <div>
          <Routes>
            <Route path="/" Component={ReservationList}/>
            <Route path="repairshoplist" Component={RepairshopList}/>
            <Route path="mainrepairshop" Component={MainRepairshop}/>

          </Routes>
    </div>
    );
}

export default Reservation;