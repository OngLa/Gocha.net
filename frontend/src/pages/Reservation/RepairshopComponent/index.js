import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./repairshopcomponent.module.css"

function RepairshopComponent({carcenter}) {

  return (
    <div className={styles.RepairshopComponent}>
      <div className={styles.cardHeader}>
        <CardHead carcenter={carcenter}/>
      </div>
      <div className="card-body">
        <CardBody carcenter={carcenter}/>
      </div>
    </div>
  );
}
export default RepairshopComponent;
