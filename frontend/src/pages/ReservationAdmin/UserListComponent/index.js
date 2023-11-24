import UserCompleteList from "./UserCompleteListComponent";
import UserMaintenanceList from "./UserMaintenanceListComponent";
import UserWaitList from "./UserWaitListComponent";
import styles from "./UserListComponent.module.css";
import {useNavigate } from "react-router-dom";

function UserListComponent({ list, refreshList}) {
  const navigate = useNavigate();

  // 상태값에 따라 문자열과 색상 변경
  const renderStatusText = (state) => {
    let text;
    let className;

    switch (state) {
      case 0:
        text = "승인대기중";
        className = styles.statusPending;
        break;
      case 1:
        text = "승인됨";
        className = styles.statusInProgress;
        break;
      case 2:
        text = "정비완료";
        className = styles.statusCompleted;
        break;
      case 3:
        text = "취소됨";
        className = styles.statusRejected;
        break;
      default:
        text = "오류";
        className = styles.statusError;
    }

    // 상태 텍스트와 클래스를 span 엘리먼트에 적용하여 반환
    return <span className={className}>{text}</span>;
  };

  // 상태에 따른 컴포넌트 렌더링
  const renderComponentBasedOnState = (state) => {
    switch (state) {
      case 0:
        return <UserWaitList list={list} refreshList={refreshList}/>;
      case 1:
        return <UserMaintenanceList list={list} refreshList={refreshList}/>;
      case 2:
        return <UserCompleteList list={list} refreshList={refreshList}/>;
      default:
        return null; // 오류나 기타 상태일 경우 아무것도 렌더링하지 않음
    }
  };

  const pageMoveText = () => {
    navigate(`/chatting2/chatroom2/:${list.id}?userName=${list.name}`);
  };
  return (
    <div className={styles.UserListComponent}>
      <div className={styles.cardHead}>
        <div className={styles.imgWrap}>
          <img
            src={`https://source.boringavatars.com/beam/${list.name}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
            alt="User"
          />
          <div>
            이름: {list.name} <br />
            상태: {renderStatusText(list.state)}
          </div>
          <div onClick={pageMoveText} className={styles.chatHistory}>
            채팅기록보기
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        {renderComponentBasedOnState(list.state)}
      </div>
    </div>
  );
}

export default UserListComponent;
