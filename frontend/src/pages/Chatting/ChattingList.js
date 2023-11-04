import style from "./chattingList.module.css";
import ChatMemberBox from "./ChatMemberBox";

function Chatting() {
  return (
    <div className={style.chattingWrap}>
      <div className={style.menuTitle}>
        <div>정비소 목록</div>
      </div>
      <div className={style.ChatMemberBoxWrap}>
        <div>
          <ChatMemberBox name="서울점" />
        </div>
        <div>
          <ChatMemberBox name="경기도점" />
        </div>
      </div>
    </div>
  );
}

export default Chatting;
