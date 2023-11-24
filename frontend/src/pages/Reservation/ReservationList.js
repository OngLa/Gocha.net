import { useNavigate } from "react-router-dom";
import styles from "./reservation.module.css";
import ContentHeader from "../../components/ContentHeader";
import LargeButton from "../../components/Button";
import ReservationComponent from "./ReservationComponent";
import { useEffect, useState } from "react";
import { readReservationList } from "../../service/reservation";
import imgMoveBottom from "../../img/icon/Caret_Down_MD.png";
import imgMoveTop from "../../img/icon/Caret_Up_MD.png";


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

function moveToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function moveToBottom() {
  // document.body.scrollHeight
  window.scroll({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}

  return (
    <div className={styles.reservationList}>
      <div><ContentHeader menuName="예약목록" /></div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center",}}>
        <div><ReservationComponent list={list} refreshList={refreshList}/></div>
        <div className={styles.largeButtonWrap}><LargeButton onClick={handleNavOnClick}>새 예약 등록</LargeButton></div>
      </div>
      <img
        src={imgMoveTop}
        alt="scroll"
        className={styles.scrollToTop}
        onClick={moveToTop}
      />
      <img
        src={imgMoveBottom}
        alt="scroll"
        className={styles.scrollToBottom}
        onClick={moveToBottom}
      />
    </div>
  );
}
export default ReservationList;
