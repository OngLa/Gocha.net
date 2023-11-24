import Swal from "sweetalert2";
import { SmallButton, SmallButton2 } from "../../../components/Button";
import { deleteFavoriteCarcenter } from "../../../service/reservation";
import styels from "./MainRepairshopComponent.module.css";

function CardBody({ favoriteCarcenter, refreshList }) {
  //주 정비소 삭제
  async function deleteClick() {
    try {
      const result = await Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        // 커스텀
        title: "삭제하시겠습니까?",
        text: "주정비소에서 삭제됩니다.",
        icon: "question", // 표시할 아이콘(error, info, question, success, warning)
        confirmButtonText: "예", // Ok 대신에 쓸 텍스트
        cancelButtonText: "아니오", // cancel 대신에 쓸 텍스트
        showCancelButton: true, // cancel 표시 유무
      });
      if (result.isConfirmed) {
        await deleteFavoriteCarcenter(favoriteCarcenter.id);
        Swal.fire({
          background: "#334E58",
          color: "#FFDA47",
          width: "80vw",
          confirmButtonColor: "#45CB85",
          cancelButtonColor: "gray",

          text: "요청이 정상 처리 되었습니다.",
          icon: "success", 
          confirmButtonText: "예", 
          cancelButtonText: "아니오", 
          showCancelButton: true, 
        });
      }
      await refreshList();
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
    }
  }

  return (
    <div>
      <div className={styels.cardBody}>
        <h2>주소</h2>
        <h3>{favoriteCarcenter.address}</h3>

        <div className="SmallButton">
          <SmallButton2 onClick={deleteClick}>삭제하기</SmallButton2>
        </div>
      </div>
    </div>
  );
}
export default CardBody;
