import styles from "./userwaitlistcomponent.module.css"

function CardHead ({list}){


  //상태값 0,1,2를 문자열 예약대기중,정비중, 정비완료로 바꾸는 로직
const renderStatusText = (status) => {
  switch (status) {
    case 0:
      return '예약 대기중';
    default:
      return status; 
  }
};

  return(
    <div className={styles.cardHead}>
    <div className={styles.imgWrap}>
    <img
      src={`https://source.boringavatars.com/beam/${list.name}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
      alt="User"
    />
    <div>
      이름: {list.name} <br/>  
      상태:<span style={{color:"#FFA500"}}>{renderStatusText(list.state)}</span>
    </div>
  </div>
  </div>
  );
}
export default CardHead;