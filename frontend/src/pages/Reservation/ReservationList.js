import { useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import LargeButton from "../../components/Button";
import ReservationComponent from "./ReservationComponent";
import { useEffect, useState } from "react";
import { readReservationList } from "../../service/reservation";

// //예약목록 출력 페이지
function ReservationList() {

  const navigate = useNavigate();
  //정비소 목록으로 이동
  const handleNavOnClick = () => {
    navigate("repairshoplist");
  };

  const [list, setList] = useState([]);

  //예약 출력
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

    // 화면 로딩 시 최하단 화면으로 시작
    function scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight); // 수직 스크롤을 문서의 높이로 이동
    }
  
    useEffect(() => {
      scrollToBottom();
    }, [list]);

//   useEffect(() => {
//     console.log(list);
//   }, [list]);

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
