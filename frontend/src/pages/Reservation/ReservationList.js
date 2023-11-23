import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import LargeButton from "../../components/Button";
import ReservationComponent from "./ReservationComponent";
import { useEffect, useState } from "react";
import { readReservationList } from "../../service/reservation";

//예약목록 출력 페이지
function ReservationList() {

  const navigate = useNavigate();
  const [list, setList] = useState([]);

//새 예약 등록 버튼 클릭시 페이지 이동
  const handleNavOnClick = () => {
    navigate("repairshoplist");
  };

  //예약목록 출력
const fetchData = async () => {
  try {
    const response = await readReservationList();
    setList(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData();
}, []);

// 예약목록 리랜더링 함수
const refreshList = () => {
  fetchData();
};

  return (
    <div>
      <div><ContentHeader menuName="예약목록" /></div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center",}}>
        <div><ReservationComponent list={list} refreshList={refreshList}/></div>
        <div style={{ marginTop: "20px" }}><LargeButton onClick={handleNavOnClick}>새 예약 등록</LargeButton></div>
      </div>
    </div>
  );
}
export default ReservationList;
