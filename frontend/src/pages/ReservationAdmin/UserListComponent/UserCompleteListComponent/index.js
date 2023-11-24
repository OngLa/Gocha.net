import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./userwaitlistcomponent.module.css";

function UserCompleteList({list}) {
  return (
    <div className={styles.UserCompleteList}>
      <CardHead list={list}/>
      <CardBody list={list}/>
    </div>
  );
}
export default UserCompleteList;
