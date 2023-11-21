import CardBody from "./CardBody";
import CardBodyFC from "./CardBodyFC";
import CardHead from "./CardHead";
import styles from "./repairshopcomponent.module.css"

function RepairshopComponent({carcenter,useCardBodyFc}) {

  return (
    <div className={styles.RepairshopComponent}>
      <div className={styles.cardHeader}>
        <CardHead carcenter={carcenter}/>
      </div>
      <div className="card-body">
      {
          useCardBodyFc ? 
          <CardBodyFC carcenter={carcenter}/> :
          <CardBody carcenter={carcenter}/>
        }
      </div>
    </div>
  );
}
export default RepairshopComponent;
