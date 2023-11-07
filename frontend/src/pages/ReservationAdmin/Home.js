import {useState } from "react";
import UserListComponent from "./UserListComponent";
import ContentHeader from "../../components/ContentHeader";
import UserFilter from "./UserFilter";
import { useNavigate } from "react-router-dom";


function Home (){
  const[filter,setFilter]=useState("");
  
  const [selectedOption, setSelectedOption] = useState('');

  const navigate=useNavigate();
  
  
  //예약되면 데이터가 넘어와서 
const userList=[
  {id:1, nickname: "루피" ,phone_number: "01012345567", car_type_id: 1,breakdown_id:1,reserved_date:"23.12.12",state:"승인대기"},
  {id:2, nickname: "조로" ,phone_number: "01012345567", car_type_id: 2,breakdown_id:2,reserved_date:"23.12.12",state:"정비중"},
  {id:3, nickname: "상디" ,phone_number: "01012345567", car_type_id: 3,breakdown_id:3,reserved_date:"23.12.12",state:"정비완료"}
]

const handleFilterChange =(e) => {
  setFilter(e.target.value);
  setSelectedOption(e.target.value);
}

 // 필터링 로직에서 빈 문자열이면 전체 목록을 반환
 const filterUserList = filter === "" ? userList : userList.filter(user => {
  return user.state.includes(filter);
});

  return(
    <div>
      <ContentHeader menuName="예약관리"/>
      
<div>
  <label style={{marginRight:"10px", color:"#fff"}} htmlFor="userlist">상태</label>
  <select style={{ marginTop:"20px",backgroundColor:"#45CB85", borderRadius:"5px", padding:"10px", paddingRight:"50px", color:"#fff", textAlign:"center"}} id="userlist"
   onChange={handleFilterChange}>
    <option value="">전체</option>
    <option value="승인대기">승인대기</option>
    <option value="정비중">정비중</option>
    <option value="정비완료">정비완료</option>
  </select>

  {selectedOption === '정비완료' && <UserFilter/> }
</div>
      <div style={{marginTop: "30px"}}>
        {/* 필터링된 유저예약목록 */}
        {filterUserList.map(userList=>(
          <UserListComponent 
          key={userList.id}
          id={userList.id}
          nickname={userList.nickname}
          phone_number={userList.phone_number}
          car_type_id={userList.car_type_id}
          breakdown_id={userList.breakdown_id}
          reserved_date={userList.reserved_date}
          state={userList.state}/>
        ))}
      </div>

    </div>
  );
}
export default Home