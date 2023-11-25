import styles from "./repairshopcomponent.module.css";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";
import { useNavigate } from "react-router";

function CardHead({ carcenter }) {
  const navigate = useNavigate();

  const pageMoveText = () => {
    navigate(
      `/chatting/chatroominfo?carcenterId=${carcenter.id}&carcenterName=${carcenter.name}`
    );
  };

  return (
    <div className={styles.cardHead}>
      {/* ===================================================== */}
      {/* 정비소명 */}
      <div className={styles.carcentername}></div>
      <div className={styles.carcenterIcon}>
        <img src={carcenterIcon} alt="carcenterIcon" />
      </div>
      <div className={styles.carcenterName}>{carcenter.name}</div>
    {/* ===================================================== */}
      {/* 상세보기 이동 텍스트 */}
      <div onClick={pageMoveText} className={styles.chatHistory}>
        상세정보보기
      </div>
    </div>
  );
}
export default CardHead;
