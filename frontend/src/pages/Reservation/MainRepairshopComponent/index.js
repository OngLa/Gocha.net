import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./MainRepairshopComponent.module.css"

function MainRepairshopComponent({carcenter}) {

  return (
    <div className={styles.MainRepairshopComponent}>
      <div className={styles.cardHeader}>
        <CardHead carcenter={carcenter}/>
      </div>
      <div className="card-body">
        <CardBody carcenter={carcenter} 
          />
      </div>
    </div>
  );
}
export default MainRepairshopComponent;
