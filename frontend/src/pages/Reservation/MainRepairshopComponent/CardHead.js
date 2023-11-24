import styles from "./MainRepairshopComponent.module.css";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";
import { useNavigate } from "react-router";

function CardHead({ favoriteCarcenter }) {
// ===================================================== //
  //상세보기 페이지 이동
  const navigate = useNavigate();
  const pageMoveText = () => {
    navigate(
      `/chatting/chatroominfo?carcenterId=${favoriteCarcenter.carcenterId}&carcenterName=${favoriteCarcenter.carcenterName}`
    );
  };
// ===================================================== //
  return (
    <div className={styles.cardHead}>
{/* ===================================================== */}
      {/* 정비소명 */}
      <div className={styles.carcentername}>
        <div className={styles.carcenterIcon}>
          <img src={carcenterIcon} alt="carcenterIcon" />
        </div>
        <div className={styles.Name}>{favoriteCarcenter.carcenterName}</div>
      </div>
{/* ===================================================== */}
      {/* 상세보기 이동 텍스트 */}
      <div onClick={pageMoveText} className={styles.chatHistory}>
        상세정보보기
      </div>
    </div>
  );
}
export default CardHead;
