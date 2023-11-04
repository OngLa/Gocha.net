import React, { useState } from "react";
import style from "./ChatMemberBox.module.css";

function ChatMemberBox(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const boxClass = isClicked ? style.ChatMemberBoxWrapClicked : style.ChatMemberBoxWrap;

  return (
    <div className={boxClass} onClick={handleClick}>
      <div className={style.imgWrap}>
        <img src="./chatting/userImg.png" alt="User" />
      </div>
      <div className={style.carcenterName}>{props.name}</div>
    </div>
  );
}

export default ChatMemberBox;
