import styles from "./repairshopcomponent.module.css";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png"

function CardHead({carcenter}) {
  return (
    <div className={styles.cardHead}>
      <div className={styles.carcenterIcon}>
        <img src={carcenterIcon} alt="carcenterIcon"/>
      </div>
      <div className={styles.carcenterName}>{carcenter.name}</div>
    </div>
  );
}
export default CardHead;
