// import { useState } from "react";
import { Route, Routes } from "react-router";
import ShopList from "./ShopList";
import ShopReservation from "./ShopReservation";
import ReservationList from "./ReservationList";


function Reservation() {



  return (
    <div>
          <Routes>
            <Route path="/" Component={ShopList}/>
            <Route path="ShopReservation" Component={ShopReservation}/>
            <Route path="ReservationList" Component={ReservationList}/>
          </Routes>
    </div>
    );
}

export default Reservation;