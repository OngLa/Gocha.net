import { SmallButton } from "../../../components/Button";
import styles from "./reservationComponent.module.css";

function CardBody({ reservationList }) {
  const handelCancleButton = () => {
    alert("취소되었습니다.");
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
