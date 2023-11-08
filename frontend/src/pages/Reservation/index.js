// import { useState } from "react";
import { Route, Routes } from "react-router";
import ReservationList from "./ReservationList";
import MainRepairshop from "./MainRepairshop";
import Sidepanel from "./RepairshopComponent/Sidepanel";
import RepairshopList from "./RepairshopList";

function Reservation() {



  return (
    <div>
          <Routes>
            <Route path="/" Component={ReservationList}/>
            <Route path="repairshoplist" Component={RepairshopList}/>
            <Route path="sidepanel" Component={Sidepanel}/>
            <Route path="mainRepairshop" Component={MainRepairshop}/>

          </Routes>
    </div>
    );
}

export default Reservation;