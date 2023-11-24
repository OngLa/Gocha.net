import styles from "./MainRepairshopComponent.module.css"
import carcenterIcon from "../../../img/chatting/carcenterIcon.png"
import { useNavigate } from "react-router";


function CardHead({favoriteCarcenter}) {

  const navigate = useNavigate();

  const pageMoveText = () => {
    navigate(
      `/chatting/chatroominfo?carcenterId=${favoriteCarcenter.carcenterId}&carcenterName=${favoriteCarcenter.carcenterName}`
    );
  };

  return(
    <div className={styles.cardHead}>
    <div className={styles.carcenterIcon}>
      <img src={carcenterIcon} alt="carcenterIcon"/>
    </div>
    <div className={styles.carcenterName}>{favoriteCarcenter.carcenterName}</div>
    <div onClick={pageMoveText} className={styles.chatHistory}>
        상세정보보기
      </div>
  </div>
);
}
export default CardHead;