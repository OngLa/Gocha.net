import style from "./chattingList.module.css";
import ChatMemberBox from "./ChatMemberBox";
import { Link } from "react-router-dom";

function ChattingList() {
  const carcenterList = [
    {
      id: "1",
      name: "서울점",
      withdrawal: "0",
    },
    {
      id: "2",
      name: "경기도점",
      withdrawal: "0",
    },
    {
      id: "3",
      name: "제주도점",
      withdrawal: "1",
    },
  ];

  return (
    <div className={style.chattingWrap}>
      <div className={style.menuTitle}>
        <div>정비소 목록</div>
      </div>
      <div className={style.ChatMemberBoxWrap}>
        {carcenterList.map((carcenter) => (
          carcenter.withdrawal === "0" &&
          <div>
            <Link to={`/chatting/chatroom/${carcenter.id}?carcenterName=${carcenter.name}`} style={{ textDecoration: "none" }}>
              <ChatMemberBox carcenterName={carcenter.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChattingList;
