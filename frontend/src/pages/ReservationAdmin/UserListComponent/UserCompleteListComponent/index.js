import CardBody from "./CardBody";
import CardHead from "./CardHead";
import styles from "./userwaitlistcomponent.module.css";

function UserCompleteList(props) {
  const { car_type_id, breakdown_id, reserved_date, nickname, phone_number ,state} = props;

  return (
    <div className={styles.UserCompleteList}>
      <CardHead nickname={nickname} state={state} />
      <CardBody
        car_type_id={car_type_id}
        breakdown_id={breakdown_id}
        reserved_date={reserved_date}
        phone_number={phone_number}
      />
    </div>
  );
}
export default UserCompleteList;
