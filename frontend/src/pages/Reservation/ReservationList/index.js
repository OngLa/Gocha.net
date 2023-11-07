import ReservationCardBody from "./ReservationCardBody";
import ReservationCardHead from "./ReservationCardHead";
import styles from "./reservationList.module.css"

function ReservationList() {

  return (
    <div className={styles.ReservationList}>
      <div className={styles.cardHeader}>
        <ReservationCardHead/>
      </div>
      <div className="card-body">
        <ReservationCardBody />
      </div>
    </div>
  );
}
export default ReservationList;
