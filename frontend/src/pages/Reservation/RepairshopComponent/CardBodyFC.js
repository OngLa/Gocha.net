import { useNavigate } from "react-router";
import { SmallButton } from "../../../components/Button";
import styels from "./repairshopcomponent.module.css";
import Swal from "sweetalert2";
import { createFavoriteCarcenter } from "../../../service/reservation";

function CardBodyFC({carcenter}) {
  const navigate = useNavigate();

  //주정비소 등록 
  const handleRegisterClick = async (event) => {
    try {
      await createFavoriteCarcenter({
        carcenterId: carcenter.id,
      });
      Swal.fire({
        icon: "success",
        title: "주정비소로 등록되었습니다..",
        confirmButtonColor: "#45CB85",
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "등록을 완료할 수 없습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div>
      <div className={styels.cardBody}>
      <div className={styels.text}>
          <p>전화번호 : {carcenter.phoneNumber}</p>
          <p>주소 : {carcenter.address}</p>
        </div>

        <div className="SmallButton">
          <SmallButton onClick={handleRegisterClick}>등록하기</SmallButton>
        </div>
      </div>
    </div>
  );
}
export default CardBodyFC;
