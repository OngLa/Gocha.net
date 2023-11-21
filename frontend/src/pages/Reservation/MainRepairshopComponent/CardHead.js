import styles from "./MainRepairshopComponent.module.css"
import carcenterIcon from "../../../img/chatting/carcenterIcon.png"


function CardHead({favoriteCarcenter}) {


  return(
    <div className={styles.cardHead}>
    <div className={styles.carcenterIcon}>
      <img src={carcenterIcon} alt="carcenterIcon"/>
    </div>
    <div className={styles.carcenterName}>{favoriteCarcenter.name}</div>
  </div>
);
}
export default CardHead;