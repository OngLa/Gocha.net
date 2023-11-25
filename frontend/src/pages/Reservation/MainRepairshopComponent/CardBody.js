import Swal from "sweetalert2";
import { SmallButton, SmallButton2 } from "../../../components/Button";
import { deleteFavoriteCarcenter } from "../../../service/reservation";
import styels from "./MainRepairshopComponent.module.css";
import { useState } from "react";
import Sidepanel2 from "../RepairshopComponent/Sidepanel2";

function CardBody({ favoriteCarcenter, refreshList }) {

  // =============================================================== //
  //주정비소에서 예약하기 사이드패널 동작 로직  
  
  const [openSidepanel, setOpenSidepanel] = useState(false);

  // 예약하기 버튼 클릭시 패널 on/off 동작
  const toggleSidepanel = () => {
    setOpenSidepanel(!openSidepanel);
  };
  // =============================================================== //
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
  // =============================================================== //

  return (
    <div>
      <div className={styels.cardBody}>
        <div className={styels.text}>
          <p>전화번호 : {favoriteCarcenter.phoneNumber}</p>
          <p>주소 : {favoriteCarcenter.address}</p>
        </div>
        <div className={styels.SmallButton}>
        <SmallButton onClick={toggleSidepanel}>예약하기</SmallButton>
          <SmallButton2 onClick={deleteClick}>삭제하기</SmallButton2>
        </div>
      </div>
  {/* =============================================================== */}
         {/* Sidepanel 컴포넌트를 조건부 렌더링 */}

         {openSidepanel && (
        <Sidepanel2
        favoriteCarcenter={favoriteCarcenter}
          open={openSidepanel}
          toggle={toggleSidepanel}
        />
      )}
    </div>
  );
}
export default CardBody;
