import React from "react";
import style from "./chatMemberBox2.module.css";

function ChatMemberBox2(props) {
  return (
    <div className={style.ChatMemberBoxWrap}>
      <div className={style.imgWrap}>
        <img src="./chatting/userIcon.png" alt="User" />
      </div>
      <div className={style.userName}>{props.userName}</div>
    </div>
  );
}

export default ChatMemberBox2;
