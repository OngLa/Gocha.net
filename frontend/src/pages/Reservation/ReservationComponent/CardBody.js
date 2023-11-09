import { SmallButton } from "../../../components/Button";
import styles from "./reservationComponent.module.css"
function CardBody({name}) {
 
const handelCancleButton=() => {
alert("취소되었습니다.")
}


  return (
    <div className={styles.cardBody}>
    <div className={styles.imgWrap}>
        <img
            src={`https://source.boringavatars.com/sunset/${name}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
            alt="User"
          />
      서울점<br/>
      예약일자: 23.11.09 <br/>
      상태: 승인대기
      <SmallButton style={{marginLeft:"10px",cursor: "pointer"}} onClick={handelCancleButton}>예약취소</SmallButton>
    </div>
    </div>
  );
}
export default CardBody;
