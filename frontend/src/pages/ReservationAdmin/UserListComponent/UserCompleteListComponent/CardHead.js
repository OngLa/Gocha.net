import styles from "./userwaitlistcomponent.module.css"

function CardHead (props){
  return(
    <div className={styles.cardHead}>
    <div className={styles.imgWrap}>
    <img
      src={`https://source.boringavatars.com/beam/${props.nickname}?colors=F26B7A,F0F2DC,D9EB52,8AC7DE,87796F`}
      alt="User"
    />
    <div>
      이름: {props.nickname} <br/> <label>상태:</label> <span style={{color:"#45cb85"}}>{props.state}</span>
    </div>
  </div>
  </div>
  );
}
export default CardHead;