import CardBody from "./CardBody";
import styles from "./reservationComponent.module.css"


function ReservationComponent({list, refreshList}) {

  return (
     <div className={styles.ReservationComponent}>
         {list.map((reservationList) => (
        <CardBody key={reservationList.id} reservationList={reservationList} refreshList={refreshList}/>
      ))}      
      </div>
  );
}
export default ReservationComponent;