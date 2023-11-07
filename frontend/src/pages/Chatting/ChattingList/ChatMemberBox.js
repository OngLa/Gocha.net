import React from "react";
import style from "./chatMemberBox.module.css";

function ChatMemberBox(props) {
  return (
    <div className={style.ChatMemberBoxWrap}>
      <div className={style.imgWrap}>
        <img src="./chatting/carcenterIcon.png" alt="User" />
      </div>
      <div className={style.carcenterName}>{props.carcenterName}</div>
    </div>
  );
}

export default ChatMemberBox;
