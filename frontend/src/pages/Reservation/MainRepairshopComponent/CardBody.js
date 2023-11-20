import { useNavigate } from "react-router";
import { SmallButton } from "../../../components/Button";
import styels from "./MainRepairshopComponent.module.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { createFavoriteCarcenter } from "../../../service/reservation";

function CardBody({ carcenter }) {
  const navigate = useNavigate();

  const handleRegisterClick = async (event) => {
    try {
      await createFavoriteCarcenter({
        id: carcenter.id,
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
  //주정비소 등록 api연동

  return (
    <div>
      <div className={styels.cardBody}>
        <h2>주소</h2>
        <h3>{carcenter.address}</h3>

        <div className="SmallButton">
          <SmallButton onClick={handleRegisterClick}>등록하기</SmallButton>
        </div>
      </div>
    </div>
  );
}
export default CardBody;
