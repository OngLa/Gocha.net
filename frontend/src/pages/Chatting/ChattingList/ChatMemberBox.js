import React from "react";
import style from "./chatMemberBox.module.css";
import carcenterIcon from "../../../img/chatting/carcenterIcon.png";

function ChatMemberBox(props) {
  // 채팅 목록에서 정비소를 표현해주는 box이다.
  // 정비소의 고유 아이콘과 이름을 담고있다.
  // 정비소의 고유 아이콘은 Boring Avatars 라이브러리를 활용함.

  return (
    <div className={style.ChatMemberBoxWrap}>
      <div className={style.imgWrap}>
        <img
          src={`https://source.boringavatars.com/sunset/${props.carcenterName}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
          alt="User"
        />
      </div>
      <div className={style.carcenterName}>{props.carcenterName}</div>
    </div>
  );
}

export default ChatMemberBox;
