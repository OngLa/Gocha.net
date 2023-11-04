import style from "./chattingList.module.css";
import ChatMemberBox from "./ChatMemberBox";

function Chatting() {
  return (
    <div className={style.chattingWrap}>
      <div className={style.menuTitle}>
        <div>회원 목록</div>
      </div>
      <div>
        <div>
          <ChatMemberBox />
        </div>
        <div>
          <ChatMemberBox />
        </div>
      </div>
    </div>
  );
}

export default Chatting;
