import styles from "./reservation.module.css";
import { SmallButton } from "../../components/Button/index";
import Calender from "../../components/Calender";
import { useState } from "react";
import { useNavigate } from "react-router";

function ShopReservation() {

  
const navigator = useNavigate();

const [reservation, setReservation] = useState();

const handleClick=() => {
  setReservation();
  navigator("ReservationList");
}

const handleClickClose=() => {
  setReservation();
}

  return (
    <div className={styles.sidepanel}>

 <div>
  <button onClick={handleClickClose}>x</button>
  </div>     
      <div>예약일자를 선택해주세요.</div>

      <div>
        <Calender />
      </div>

      <div>
        <SmallButton style={{ width: '100px' }}
        onClick={handleClick}>
          예약하기</SmallButton>
      </div>
    </div>
  );
}
export default ShopReservation;
