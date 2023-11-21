import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./MainRepairshopComponent.module.css"

function MainRepairshopComponent({favoriteCarcenter}) {

  return (
    <div className={styles.MainRepairshopComponent}>
      <div>
        <CardHead favoriteCarcenter={favoriteCarcenter}/>
      </div>
      <div>
        <CardBody favoriteCarcenter={favoriteCarcenter} 
          />
      </div>
    </div>
  );
}
export default MainRepairshopComponent;
