import UserCompleteList from "./UserCompleteListComponent";
import UserMaintenanceList from "./UserMaintenanceListComponent";
import UserWaitList from "./UserWaitListComponent";

function UserListComponent(props){
  const {car_type_id, breakdown_id, reserved_date, nickname, phone_number ,state} = props;
  
  return(
    <div>
      <UserWaitList car_type_id={car_type_id} breakdown_id={breakdown_id} reserved_date={reserved_date} nickname={nickname} phone_number={phone_number} state={state}/>
      <UserMaintenanceList car_type_id={car_type_id} breakdown_id={breakdown_id} reserved_date={reserved_date} nickname={nickname} phone_number={phone_number} state={state}/>
      <UserCompleteList car_type_id={car_type_id} breakdown_id={breakdown_id} reserved_date={reserved_date} nickname={nickname} phone_number={phone_number} state={state}/>
    </div>
  );
}
export default UserListComponent