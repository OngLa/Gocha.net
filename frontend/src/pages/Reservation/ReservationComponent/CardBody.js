import Swal from "sweetalert2";
import { SmallButton } from "../../../components/Button";
import styles from "./reservationComponent.module.css";

function CardBody({ reservationList }) {
  const handelCancleButton = () => {
    return Swal.fire({
      icon: "question",
      title: "정말로 예약취소하시겠습니까?",
      text: "취소 시, 예약정보가 사라집니다.",
      showCancelButton: true,
      confirmButtonText: "예",
      confirmButtonColor: "#45CB85",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "요청이 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
      }
    });
  };
  //yyyy-mm-dd-hh-mm 형식으로 변경
  const formatedDate = new Date(reservationList.reservedDate).toLocaleString(
    "ko-Kr",
    {
      // year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식을 사용
    }
  );
  return (
    <div className={styles.cardBody}>
      <div className={styles.imgWrap}>
        <img
          src={`https://source.boringavatars.com/sunset/${reservationList.id}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
          alt="User"
        />
        <div>
          지점명 : {reservationList.carcenterId}
          <br/>
          예약날짜 : {formatedDate} 
          <br/>
          상태 : {reservationList.state}
        </div>
        <SmallButton
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={handelCancleButton}
        >
          예약취소
        </SmallButton>
      </div>
    </div>
  );
}
export default CardBody;