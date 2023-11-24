import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./MainRepairshopComponent.module.css";

function MainRepairshopComponent({ favoriteCarcenter, refreshList}) {
  return (
    <div  className={styles.flexCenter}>
      <div className={styles.MainRepairshopComponent}>
        <div>
          <CardHead favoriteCarcenter={favoriteCarcenter} />
        </div>
        <div>
          <CardBody favoriteCarcenter={favoriteCarcenter} refreshList={refreshList}/>
        </div>
      </div>
    </div>
  );
}
export default MainRepairshopComponent;
