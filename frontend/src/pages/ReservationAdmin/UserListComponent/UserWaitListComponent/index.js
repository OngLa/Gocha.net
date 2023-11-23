import styles from "./userwaitlistcomponent.module.css";
import { useNavigate } from "react-router-dom";
import { SmallButton, SmallButton2 } from "../../../../components/Button";
import { updateState } from "../../../../service/reservation";
import Swal from "sweetalert2";

 //승인대기 컴포넌트
 function UserMaintenanceList({list, refreshList}) {
   const navigate = useNavigate();
   
   // 정비완료 버튼 클릭 핸들러
  async function handleCompleteClick() {
    try {
      const result = await Swal.fire({
        title: "예약승인 하시겠습니까",
        text: "예약승인으로 변경됩니다",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        await updateState({
          id: list.id,
          state: 1
          });
        Swal.fire("완료!", "상태가 업데이트되었습니다.", "success");
        await refreshList();
      }
    } catch (error) {
      console.error('상태 업데이트 중 오류 발생:', error);
      Swal.fire("오류", "상태 업데이트 중 오류가 발생했습니다.", "error");
    }
  }

   // 정비취소 버튼 클릭 핸들러
   async function handleCancelClick() {
    try {
      const result = await Swal.fire({
        title: "예약거절 하시겠습니까",
        text: "예약거절시 채팅페이지로 이동됩니다",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        await updateState({
          id: list.id,
          state: 3
          });;
        Swal.fire("완료!", "상태가 업데이트되었습니다.", "success");
        navigate(`/chatting2/writeform2/${list.id}?userName=${list.name}&inputTitle=${"다음 사유로 인해 예약이 취소되었습니다."}&noReservation=${1}`);
      }
    } catch (error) {
      console.error('상태 업데이트 중 오류 발생:', error);
      Swal.fire("오류", "상태 업데이트 중 오류가 발생했습니다.", "error");
    }
  }

  return (
    <div>
      <div className={styles.cardBody}>
        <div className={styles.h2}>
          <h2>에러코드:{list.carDataId}</h2>
          <h2>예약일자:{list.reservedDate}</h2>
          <h2>전화번호:{list.phoneNumber}</h2>
        </div>

        <div className={styles.button}>
          <SmallButton onClick={handleCompleteClick }>예약승인</SmallButton>
          <SmallButton2 onClick={handleCancelClick}>예약거절</SmallButton2>
        </div>
      </div>
    </div>
  );
}
export default UserMaintenanceList;
