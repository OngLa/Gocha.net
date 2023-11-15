import UserCompleteList from "./UserCompleteListComponent";
import UserMaintenanceList from "./UserMaintenanceListComponent";
import UserWaitList from "./UserWaitListComponent";

function UserListComponent(props) {
  const { car_type_id, breakdown_id, reserved_date, nickname, phone_number, state } = props;

  

  return (
    <div>
      {state === "승인대기" && (
        <UserWaitList
          car_type_id={car_type_id}
          breakdown_id={breakdown_id}
          reserved_date={reserved_date}
          nickname={nickname}
          phone_number={phone_number}
          state={state} // "승인대기" 상태를 전달
        />
      )}
      {state === "정비중" && (
        <UserMaintenanceList
          car_type_id={car_type_id}
          breakdown_id={breakdown_id}
          reserved_date={reserved_date}
          nickname={nickname}
          phone_number={phone_number}
          state={state} // "정비중" 상태를 전달
        />
      )}
      {state === "정비완료" && (
        <UserCompleteList
          car_type_id={car_type_id}
          breakdown_id={breakdown_id}
          reserved_date={reserved_date}
          nickname={nickname}
          phone_number={phone_number}
          state={state} // "정비완료" 상태를 전달
        />
      )}
    </div>
  );
}

export default UserListComponent