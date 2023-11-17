import styles from "./sidepanel.module.css";
import { SmallButton } from "../../../components/Button/index";
import Calender from "../../../components/Calender";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { createReservation } from "../../../apis/reservation";
import Swal from "sweetalert2";

function Sidepanel({ open, toggle, id }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  //날짜데이터 상태
  const [selectCardata, setSelectCardata] = useState(null);
  //차데이터 상태

  const postReservationData = useCallback(
    async (event) => {
      console.log("선택된 날짜", selectedDate);
      try {
        await createReservation({
          reservedDate: selectedDate, //예약날짜
          carcenterId: 100002,        //지점명
          carDataId: selectCardata    //선택한 데이터(null허용)
        });
        console.log("예약하기 동작함");
        Swal.fire({
          icon: "success",
          title: "요청이 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
        navigate(-1);
      } catch (error) {
        console.log(error, "POST실패");
      }
    },
    [selectedDate, selectCardata]
  );
// 서버에 axios.post 전송 로직

  const carDataList = [
    {id: "3",last_update: "2023/11/06",},{id: "3",last_update: "2023/11/05",},
    {id: "2",last_update: "2023/11/04",},{id: "1",last_update: "2023/11/03",},];
  //임시 차량 데이터

  return (
    <div className={`${styles.sidePanel} ${open ? styles.open : ""}`}>

      <div>예약일자를 선택해주세요.</div>

      <div style={{ marginTop: "20px"}}><Calender onDateChange={setSelectedDate}/></div>

      <div>
        <label htmlFor="carData">데이터 선택 : </label>
        <select id="carData" onChange={(event) => setSelectCardata(event.target.value)}>
          <option value="">선택안함</option>
          {carDataList.map((carData) => (
            <option value={carData.id}>
              데이터{carData.id} ({carData.last_update})
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <SmallButton onClick={postReservationData} style={{ marginRight: "10px" }}>예약하기</SmallButton>
        <SmallButton onClick={toggle} style={{ backgroundColor: "#647A76" }}>뒤로가기</SmallButton>
      </div>

    </div>
  );
}
export default Sidepanel;
