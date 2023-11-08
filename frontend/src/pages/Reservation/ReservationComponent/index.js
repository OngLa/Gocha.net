import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./reservationComponent.module.css"

function ReservationComponent() {

  return (
    
      <div className={styles.ReservationComponent}>
        <div className={styles.cardHeader}>
          <CardHead/>
        </div>
        <div className="card-body">
          <CardBody />
        </div>
      </div>
  
  );
}
export default ReservationComponent;
