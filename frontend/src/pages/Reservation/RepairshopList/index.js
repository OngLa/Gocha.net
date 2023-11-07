import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./repairshopList.module.css"

function RepairshopList(props) {

  const { id, address, name } = props;


  return (
    <div className={styles.RepairshopList}>
      <div className={styles.cardHeader}>
        <CardHead id={id} name={name}/>
      </div>
      <div className="card-body">
        <CardBody address={address}
          buttonText={props.buttonText} // 버튼 텍스트 prop 추가
          />
      </div>
    </div>
  );
}
export default RepairshopList;
