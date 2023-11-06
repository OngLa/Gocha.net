import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./repairshopList.module.css"

function RepairshopList() {
  return (
    <div className={styles.RepairshopList}>
      <div className={styles.cardHeader}>
        <CardHead />
      </div>
      <div className="card-body">
        <CardBody />
      </div>
    </div>
  );
}
export default RepairshopList;
