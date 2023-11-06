import React from "react";
import style from "./chatPartnerProfile2.module.css";

function ChatPartnerProfile2(props) {
  return (
    <div className={style.ChatPartnerProfileWrap}>
      <div className={style.imgWrap}>
        <img src="./chatting/userIcon.png" alt="User" />
      </div>
      <div className={style.userName}>{props.userName}</div>
    </div>
  );
}

export default ChatPartnerProfile2;
