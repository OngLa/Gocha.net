import Swal from "sweetalert2";
import { SmallButton, SmallButton2 } from "../../../components/Button";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";
import styles from "./reservationComponent.module.css";
import { deleteReservation } from "../../../service/reservation";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function CardBody({ reservationList, refreshList }) {
  const navigate = useNavigate();

  //예약 취소
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
        });
      }
      await refreshList();
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
      Swal.fire("오류", "상태 업데이트 중 오류가 발생했습니다.", "error");
    }
  }

  // 상태값에 따라 문자열과 색상 변경
  const renderStatusText = (state) => {
    let text;
    let className;

    switch (state) {
      case 0:
        text = "승인대기중";
        className = styles.statusPending;
        break;
      case 1:
        text = "승인됨";
        className = styles.statusInProgress;
        break;
      case 2:
        text = "정비완료";
        className = styles.statusCompleted;
        break;
      case 3:
        text = "취소됨";
        className = styles.statusRejected;
        break;
      default:
        text = "오류";
        className = styles.statusError;
    }
    // 상태 텍스트와 클래스를 span 엘리먼트에 적용하여 반환
    return <span className={className}>{text}</span>;
  };

  const pageMoveText = () => {
    navigate(
      `/chatting/chatroominfo?carcenterId=${reservationList.carcenterId}&carcenterName=${reservationList.carcenterName}`
    );
  };

  return (
    // <Link
    //   to={`/chatting/chatroominfo?carcenterId=${reservationList.carcenterId}&carcenterName=${reservationList.carcenterName}`}
    //   style={{ textDecoration: "none" }}
    // >
    <div className={styles.cardBody}>
      <div className={styles.imgWrap}>
        <img
          // src={`https://source.boringavatars.com/beam/${reservationList.id}?colors=4D433D,525C5A,56877D,8CCC81,BADE57`}
          src={carcenterIcon}
          alt="User"
        />
      </div>

      <div className={styles.statusTextWrapper}>
        지점명 : {reservationList.carcenterName}
        <br />
        예약날짜 : <br />
        {reservationList.reservedDate}
        <br />
        상태 :{" "}
        <span style={{ color: "#FFA500" }}>
          {renderStatusText(reservationList.state)}
        </span>
      </div>

      <div className={styles.chatpart}>
        {reservationList.state === 0 ? (
          <div className={styles.button}>
            <SmallButton2 onClick={handelCancleButton}>예약취소</SmallButton2>
        <div onClick={pageMoveText} className={styles.chatHistory}>
          상세정보보기
        </div>
          </div>
        ) : (
          <div><SmallButton onClick={pageMoveText}>상세정보</SmallButton></div>
        )}
      </div>
      
    </div>
    // </Link>
  );
}
export default CardBody;
