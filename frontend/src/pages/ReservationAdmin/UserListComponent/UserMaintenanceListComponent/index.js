import styles from "./userwaitlistcomponent.module.css";
import { useNavigate } from "react-router-dom";
import { SmallButton, SmallButton2 } from "../../../../components/Button";
import { updateState } from "../../../../service/reservation";
import Swal from "sweetalert2";

//진행중 컴포넌트
function UserMaintenanceList({ list, refreshList }) {
  const navigate = useNavigate();

  // 정비완료 버튼 클릭 핸들러
  async function handleCompleteClick() {
    try {
      const result = await Swal.fire({
        // 수정x
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        // 커스텀
        title: "완료 하시겠습니까",
        text: "정비소견 작성페이지로 이동됩니다.",
        icon: "question", // 표시할 아이콘(error, info, question, success, warning)
        confirmButtonText: "완료", // Ok 대신에 쓸 텍스트
        cancelButtonText: "취소", // cancel 대신에 쓸 텍스트
        showCancelButton: true, // cancel 표시 유무
      });

      if (result.isConfirmed) {
        await updateState({
          id: list.id,
          state: 2,
        });
        Swal.fire({
          // 수정x
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",

          // 커스텀
          title: "완료되었습니다!",
          icon: "success", // 표시할 아이콘(error, info, question, success, warning)
        });
        navigate(`/chatting2/writeform2?userId=${list.memberId}&userName=${list.name}&inputTitle=${"정비완료 되었습니다."}&noReservation=${1}`);
        await refreshList();
      }
    } catch (error) {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        text: "상태 업데이트 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        showCancelButton: true,
        });
    }
  }

  // 정비취소 버튼 클릭 핸들러
  async function handleCancelClick() {
    try {
      const result = await Swal.fire({
         // 수정x
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        // 커스텀
        title: "취소 하시겠습니까",
        text: "취소사유 작성 페이지로 이동됩니다",
         icon: "question", // 표시할 아이콘(error, info, question, success, warning)
         confirmButtonText: "거절", // Ok 대신에 쓸 텍스트
         cancelButtonText: "취소", // cancel 대신에 쓸 텍스트
         showCancelButton: true, // cancel 표시 유무
      });

      if (result.isConfirmed) {
        await updateState({
          id: list.id,
          state: 3,
        });
        Swal.fire({
          // 수정x
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",

          // 커스텀
          title: "취소 되었습니다!",
          icon: "success", // 표시할 아이콘(error, info, question, success, warning)
        });
        navigate(
          `/chatting2/writeform2?userId=${list.memberId}&userName=${
            list.name
          }&inputTitle=${"다음 사유로 인해 예약이 취소되었습니다."}&noReservation=${1}`
        );
      }
    } catch (error) {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",
        cancelButtonColor: "gray",

        text: "상태 업데이트 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        showCancelButton: true,
        });
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
          <SmallButton onClick={handleCompleteClick}>정비완료</SmallButton>
          <SmallButton2 onClick={handleCancelClick}>정비취소</SmallButton2>
        </div>
      </div>
    </div>
  );
}
export default UserMaintenanceList;
