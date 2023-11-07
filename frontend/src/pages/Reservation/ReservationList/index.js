import ContentHeader from "../../../components/ContentHeader";
import ReservationCardBody from "./ReservationCardBody";
import ReservationCardHead from "./ReservationCardHead";
import styles from "./reservationList.module.css"

function ReservationList() {

  return (
    <div>
        <ContentHeader menuName="예약관리"/>
      <div className={styles.ReservationList}>
        <div className={styles.cardHeader}>
          <ReservationCardHead/>
        </div>
        <div className="card-body">
          <ReservationCardBody />
        </div>
      </div>
    </div>
  );
}
export default ReservationList;
