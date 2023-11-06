import { SmallButton } from "../../../components/Button";
import styles from "./reservationList.module.css"
function ReservationCardBody(props) {
 

  return (
    <div className={styles.cardBody}>
    주소
    예약일자
    상태
    <SmallButton>예약취소</SmallButton>
    </div>
  );
}
export default ReservationCardBody;
