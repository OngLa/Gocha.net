import styles from "./sidepanel.module.css";
import { SmallButton } from "../../../components/Button/index";
import Calender from "../../../components/Calender";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { createReservation } from "../../../service/reservation";
import Swal from "sweetalert2";
import axios from "axios";

//사이드패널
function Sidepanel2({ open, toggle, favoriteCarcenter}) {

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState({
    selectCar: "",
    cardataId: null,
  });

  // 예약하기
  const postReservationData = useCallback(
    async (event) => {
      console.log("선택된 날짜", selectedDate);
      try {
        await createReservation({
          reservedDate: selectedDate, //예약날짜
          carcenterId: favoriteCarcenter.carcenterId,  //지점명
          carDataId: message.cardataId    //선택한 데이터(null허용)
        });
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
    [selectedDate, message.cardataId]
  );

  //임시 차량 데이터
  // const carDataList = [
  //   {id: "3",last_update: "2023/11/06",},{id: "3",last_update: "2023/11/05",},
  //   {id: "2",last_update: "2023/11/04",},{id: "1",last_update: "2023/11/03",},];


    // 본인의 차량과 차데이터 가져오기
    const [carList, setCarList] = useState([]);
    const [carDataList, setCarDataList] = useState([]);
    useEffect(() => {
      const loadingData = async () => {
        try {
          const response_car = await axios.get(
            "http://localhost:8080/api/chatting/car"
          );
          const response_cardata = await axios.get(
            "http://localhost:8080/api/chatting/cardata"
          );
          setCarList(response_car.data);
          setCarDataList(response_cardata.data);
          window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
          console.log(error);
        }
      };
      loadingData();
    }, []);

  return (
    <div className={`${styles.sidePanel} ${open ? styles.open : ""}`}>

      <div>예약일자를 선택해주세요.</div>

      <div style={{ marginTop: "20px"}}><Calender onDateChange={setSelectedDate}/></div>

      <div>
        {/* 차량 선택 */}
      <div className={styles.selectData}>
        <div for="car" className={styles.selectDataLabel}>
          <div>차량 선택</div>
        </div>
        <select
          className={styles.dataSelectBox}
          id="car"
          name="car"
          value={message.selectCar}
          onChange={(e) => {
            const selectedCarId = e.target.value;
            setMessage({
              ...message,
              selectCar: selectedCarId,
            });
          }}
        >
          <option value="">선택</option>
          {carList.map((car) => (
            <option key={car.id} value={car.id}>
              {car.carNumber}
            </option>
          ))}
        </select>
      </div>
      {/* 데이터 선택 */}
      <div className={styles.selectData}>
        <div for="data" className={styles.selectDataLabel}>
          <div>데이터 선택</div>
        </div>
        <select
          className={styles.dataSelectBox}
          id="data"
          name="data"
          value={message.cardataId}
          onChange={(e) => {
            const selectedDataId = e.target.value;
            setMessage({
              ...message,
              cardataId: parseInt(selectedDataId, 10), // 정수로 변환
            });
          }}
        >
          <option value="">선택</option>
          {carDataList
            .filter((data) => data.carId === parseInt(message.selectCar)) //데이터 필터링
            .map((data) => (
              <option key={data.id} value={data.id}>
                Update - {data.lastUpdate}
              </option>
            ))}
        </select>
      </div>

      </div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <SmallButton onClick={postReservationData} style={{ marginRight: "10px" }}>예약하기</SmallButton>
        <SmallButton onClick={toggle} style={{ backgroundColor: "#647A76" }}>뒤로가기</SmallButton>
      </div>

    </div>
  );
}
export default Sidepanel2;
