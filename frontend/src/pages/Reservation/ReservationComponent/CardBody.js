import Swal from "sweetalert2";
import { SmallButton } from "../../../components/Button";
import styles from "./reservationComponent.module.css";
import { deleteReservation } from "../../../apis/reservation";

function CardBody({ reservationList }) {

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
  } catch (error) {
    console.error("예약 취소 중 오류 발생:", error);
  }
}
//예약취소 버튼 클릭시 axio.delete작동 
 

const renderStatusText = (status) => {
  switch (status) {
    case 0:
      return '예약 대기중';
    default:
      return status; 
  }
};
//상태값 0,1,2를 문자열 예약대기중,정비중, 정비완료로 바꾸는 로직

  return (
    <div className={styles.cardBody}>
      <div className={styles.imgWrap}>
        <img
          src={`https://source.boringavatars.com/beam/${reservationList.id}?colors=4D433D,525C5A,56877D,8CCC81,BADE57`}
          alt="User"
        />
        <div>
          지점명 : {reservationList.carcenterId}
          <br/>
          예약날짜 :<br/>{reservationList.reservedDate} 
          <br/>
          상태 : <span style={{color:"#FFA500"}}>{renderStatusText(reservationList.state)}</span>
        </div>
        <SmallButton
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={handelCancleButton}>
          예약취소
        </SmallButton>
      </div>
    </div>
  );
}
export default CardBody;