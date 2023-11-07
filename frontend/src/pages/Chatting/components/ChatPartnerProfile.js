import React from "react";
import style from "./chatPartnerProfile.module.css";

function ChatPartnerProfile(props) {
  return (
    <div className={style.ChatPartnerProfileWrap}>
      <div className={style.imgWrap}>
        <img src="./chatting/carcenterIcon.png" alt="User" />
      </div>
      <div className={style.carcenterName}>{props.carcenterName}</div>
    </div>
  );
}

export default ChatPartnerProfile;
