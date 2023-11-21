import Swal from "sweetalert2";
import { SmallButton2 } from "../../../components/Button";
import searchIcon from "../../../img/chatting/searchIcon.png";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";
import styles from "./reservationComponent.module.css";
import { deleteReservation } from "../../../service/reservation";
import { Link } from "react-router-dom";

function CardBody({ reservationList }) {

  //예약 삭제 
  async function handelCancleButton() {
  try {
    const result = await Swal.fire({
      icon: "question",
      title: "정말로 예약취소하시겠습니까?",
      text: "취소 시, 예약정보가 사라집니다.",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: "#45CB85",
      cancelButtonText: "아니오",
    });
    if (result.isConfirmed) {
      await deleteReservation(reservationList.id);
      Swal.fire({
        icon: "success",
        title: "요청이 정상 처리 되었습니다.",
        confirmButtonColor: "#45CB85",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        await deleteReservation(reservationList.id);
        Swal.fire({
          icon: "success",
          title: "요청이 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
      }
    }} catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
    }
  }
  //예약취소 버튼 클릭시 axio.delete작동

  const renderStatusText = (status) => {
    switch (status) {
      case 0:
        return "예약 대기중";
      case 1:
        return "정비중";
      case 2:
        return "정비완료";
      case 3:
        return "예약 거절";
      default:
        return "error";
    }
  };
  //상태값 0,1,2를 문자열 예약대기중,정비중, 정비완료로 바꾸는 로직

  return (
    <Link
      to={`/chatting/chatroominfo?carcenterId=${reservationList.carcenterId}&carcenterName=${reservationList.carcenterName}`}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.cardBody}>
        <div className={styles.imgWrap}>
          <img
            // src={`https://source.boringavatars.com/beam/${reservationList.id}?colors=4D433D,525C5A,56877D,8CCC81,BADE57`}
            src={carcenterIcon}
            alt="User"
          />
          <div>
            지점명 : {reservationList.carcenterName}
            <br />
            예약날짜 :<br />
            {reservationList.reservedDate}
            <br />
            상태 :{" "}
            <span style={{ color: "#FFA500" }}>
              {renderStatusText(reservationList.state)}
            </span>
          </div>
          {reservationList.state === 0 ? (
            <SmallButton2
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={handelCancleButton}
            >
              예약취소
            </SmallButton2>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Link>
  );
}
export default CardBody;
