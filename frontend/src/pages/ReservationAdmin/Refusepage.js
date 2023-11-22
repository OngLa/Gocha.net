import { useLocation, useNavigate } from "react-router-dom";
import { SmallButton } from "../../components/Button";
import ContentHeader from "../../components/ContentHeader";
import Swal from "sweetalert2";
import { deleteReservation } from "../../service/reservation";
import styles from "./reservationAdmin.module.css";

function Refusepage() {
  const navigate = useNavigate();
  //navigate같은 경로에서 객체 전달해줄떄 useLocation사용(프롭스 같은 기능)
  const location = useLocation();
  const { list } = location.state;

  //예약삭제
  async function hadleDeleteOnclick() {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "정말로 예약취소하시겠습니까?",
        text: "취소 시, 예약정보가 사라집니다.",
        showCancelButton: true,
        confirmButtonText: "예",
        confirmButtonColor: "#45CB85",
        cancelButtonText: "아니오",
      });
      if (result.isConfirmed) {
        await deleteReservation(list.id);
        Swal.fire({
          icon: "success",
          title: "요청이 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
    }
  }

  return (
    <div className={styles.Refusepage}>
      <ContentHeader menuName="예약관리_예약거절" />
      <div>
        <h2 style={{color:"#fff"}}>가산 디지털점</h2>
        <h3 style={{color:"#47f6c1"}}>거절 사유 내용</h3>
      </div>
      <div>
        <textarea className={styles.textarea} placeholder="거절사유를 입력해주세요"></textarea>
      </div>

      <div className={styles.button}>
        <SmallButton onClick={hadleDeleteOnclick}>보내기</SmallButton>
      </div>
    </div>
  );
}
export default Refusepage;
