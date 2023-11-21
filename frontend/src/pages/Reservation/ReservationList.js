import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import LargeButton from "../../components/Button";
import ReservationComponent from "./ReservationComponent";
import { useEffect, useState } from "react";
import { readReservationList } from "../../service/reservation";

function ReservationList() {
  // //예약목록 출력 페이지

  const navigate = useNavigate();
  const handleNavOnClick = () => {
    navigate("repairshoplist");
  };
  //등록하기 누르면 정비소 목록으로 이동

  const [list, setList] = useState([]);
//서버에서 가져온 데이터 저장하는 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readReservationList();
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div>
      <div><ContentHeader menuName="예약목록" /></div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center",}}>
        <div><ReservationComponent list={list} /></div>
        <div style={{ marginTop: "20px" }}><LargeButton onClick={handleNavOnClick}>새 예약 등록</LargeButton></div>
      </div>
    </div>
  );
}
export default ReservationList;
