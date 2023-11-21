import Swal from "sweetalert2";
import { SmallButton } from "../../../components/Button";
import styles from "./reservationComponent.module.css";
import { deleteReservation } from "../../../service/reservation";

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
      });
      
    }
  } catch (error) {
    console.error("예약 취소 중 오류 발생:", error);
  }
}
 

//상태값 0,1,2를 문자열 예약대기중,정비중, 정비완료로 바꾸는 로직
const renderStatusText = (status) => {
  switch (status) {
    case 0:
      return '예약 대기중';
    default:
      return status; 
  }
};

//carcenterId값에 따라 지점명 입력
const renderCarcenterIdText = (carcenterId) => {
  switch (carcenterId) {
    case 100002:
      return '서울점';
      case 100003:
      return '인천점';
      case 100004:
      return '경기도점';
    default:
      return carcenterId; 
  }
};

  return (
    <div className={styles.cardBody}>
      <div className={styles.imgWrap}>
        <img
          src={`https://source.boringavatars.com/beam/${reservationList.id}?colors=4D433D,525C5A,56877D,8CCC81,BADE57`}
          alt="User"
        />
        <div>
          지점명 : {renderCarcenterIdText(reservationList.carcenterId)}
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