import React from "react";
import style from "./chatPartnerProfile.module.css";
import { useNavigate } from "react-router-dom";
import Chevron_Left from "../../../img/icon/Chevron_Left.png";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";

function ChatPartnerProfile(props) {
  // 고객의 채팅 파트너인 정비소의 아이콘과 이름을 표시하는 좌측 상단 박스
  // props로 userName이 있으며 정비소이름을 전달.
  // 뒤로가기 기능도 포함

  const navigate = useNavigate();
  function handleCancel(event) {
    navigate(-1);
  }

  return (
    <div className={style.ChatPartnerProfileWrap}>
      <button onClick={handleCancel}>
        <img src={Chevron_Left} alt="left" />
      </button>
      <div className={style.imgWrap}>
        <img
          // src={`https://source.boringavatars.com/sunset/${props.carcenterName}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
          src={carcenterIcon}
          alt="User"
        />
      </div>
      <div className={style.carcenterName}>{props.carcenterName}</div>
    </div>
  );
}

export default ChatPartnerProfile;
