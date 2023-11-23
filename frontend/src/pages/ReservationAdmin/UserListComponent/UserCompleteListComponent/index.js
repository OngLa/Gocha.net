import styles from "./userwaitlistcomponent.module.css";

function UserCompleteList({list}) {
  //정비완료 컴포넌트

  return (
    <div className={styles.UserCompleteList}>
      <div className={styles.h2}>
        <h2>에러코드:{list.carDataId}</h2>
        <h2>예약일자:{list.reservedDate}</h2>
        <h2>전화번호:{list.phoneNumber}</h2>
      </div>
    </div>
  );
}
export default UserCompleteList;
