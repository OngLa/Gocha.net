import styles from "./reservation.module.css";
import { SmallButton } from "../../components/Button/index";
import Calender from "../../components/Calender";
import { useNavigate } from "react-router";
import { useState } from "react";

function Sidepanel({ open, toggle }) {

const navigate = useNavigate();
const [selectedDate, setSelectedDate] = useState(null);



const handleReservation = () => {
  // if (selectedDate) {
    // axios.post('/api/reservation', {
    //   date: selectedDate
    // })
    // .then(response => {
      // 성공적으로 예약되었을 때 예약목록 페이지로 이동
      alert("테스트");
      navigate('./ReservationList');
    // })
    // .catch(error => {
      // 에러 처리
      // console.error('Reservation error:', error);
    // });
  // } else {
    // alert('예약일자를 선택해주세요.');
  // }
};


  return (
    <div className={`${styles.sidePanel} ${open ? styles.open : ""}`}>
      <div>예약일자를 선택해주세요.</div>



      <div style={{
        marginTop:"20px"
      }}>
        <Calender onDateChange={setSelectedDate} />
      </div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <SmallButton onClick={handleReservation} style={{ marginRight: "10px" }}>
          예약하기
        </SmallButton>
        <SmallButton onClick={toggle} style={{ backgroundColor: "#647A76" }}>
          뒤로가기
        </SmallButton>
      </div>
    </div>
  );
}
export default Sidepanel;
