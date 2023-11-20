import { useNavigate } from "react-router-dom";
import { SmallButton, SmallButton2 } from "../../../components/Button";
import style from "./chatBox.module.css";
import { useState } from "react";
import Sidepanel from "./Sidepanel";

function ChatBox(props) {
  // ChatBox는 채팅방에 사용되는 제목&내용을 포함한 박스이다.
  // props는 3가지(title, content, sender)
  // title, content는 말그대로 text넣어주면 되고
  // *sender에는 Carcenter 또는 User를 넣어주어 sender를 구분해준다.
  // 참고로 박스 왼쪽, 오른쪽 배치는 여기서 조정하는게 아니라. chatroom 컴포넌트에서 className으로 조정하는 것임에 주의.

  const navigate = useNavigate(); // useNavigate 훅을 사용
  const moveReservation = () => {
    navigate(`/reservation?cardata_id=${props.cardataId}`);
  };

  const [openSidepanel, setOpenSidepanel] = useState(false);

  const toggleSidepanel = () => {
    setOpenSidepanel(!openSidepanel);
  };

  if (props.issender === "1") {
    return (
      <div>
        <div className={style.ChatBoxUserWrap}>
          <div className={style.titleUser}>{props.title}</div>
          <hr className={style.hrLineUser} />
          <div className={style.content}>{props.content}</div>
          {/* 데이터 보기 */}
          {props.cardataId !== undefined && props.cardataId !== null ? (
            <div>
              <div className={style.is_reservation}>
                <SmallButton2
                  children="데이터 보기"
                  style={{ width: "90px" }}
                  onClick={toggleSidepanel}
                />
              </div>
              <div>
                {openSidepanel && (
                  <Sidepanel open={openSidepanel} toggle={toggleSidepanel} cardataId={props.cardataId} />
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className={style.send_dateUser}>
          <div>{props.sendDate}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={style.ChatBoxCarcenterWrap}>
          <div className={style.titleCarcenter}>{props.title}</div>
          <hr className={style.hrLineCarcenter} />
          <div className={style.content}>{props.content}</div>
          {props.isReservation === true ? (
            <div className={style.is_reservation}>
              <SmallButton children="예약하기" onClick={moveReservation} />
            </div>
          ) : null}
        </div>
        <div className={style.send_dateCarcenter}>
          <div>{props.sendDate}</div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
