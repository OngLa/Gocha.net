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
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        icon: "success",
        text: "주정비소로 등록되었습니다.",
        confirmButtonText: "확인",
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        background: "#334E58",
        color: "#FFDA47",
        width: "80vw",
        confirmButtonColor: "#45CB85",

        icon: "error",
        title: "등록에 실패했습니다.",
        text: "이미 등록된 정비소 입니다.",
        confirmButtonText: "확인",
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
