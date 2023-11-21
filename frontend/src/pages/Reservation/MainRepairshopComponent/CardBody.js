import Swal from "sweetalert2";
import { SmallButton } from "../../../components/Button";
import { deleteFavoriteCarcenter } from "../../../service/reservation";
import styels from "./MainRepairshopComponent.module.css";

function CardBody({ favoriteCarcenter }) {

  //주 정비소 삭제
  async function deleteClick() {
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
        await deleteFavoriteCarcenter(favoriteCarcenter.id);
        Swal.fire({
          icon: "success",
          title: "요청이 정상 처리 되었습니다.",
          confirmButtonColor: "#45CB85",
        });
      }
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
          <SmallButton onClick={deleteClick}>삭제하기</SmallButton>
        </div>
      </div>
    </div>
  );
}
export default CardBody;
