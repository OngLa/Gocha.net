import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./repairshopcomponent.module.css"

function RepairshopComponent(props) {

  const { id, address, name } = props;


  return (
    <div className={styles.RepairshopComponent}>
      <div className={styles.cardHeader}>
        <CardHead id={id} name={name}/>
      </div>
      <div className="card-body">
        <CardBody id={id} address={address}
          buttonText={props.buttonText}
          />
      </div>
    </div>
  );
}
export default RepairshopComponent;
