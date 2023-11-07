import styles from "./userwaitlistcomponent.module.css"

function CardHead (props){
  return(
    <div className={styles.cardHead}>
      <h2>{props.nickname} {props.phone_number}</h2>
      {/* 회원이름과 전화번호 프롭스 */}
    </div>
  );
}
export default CardHead;