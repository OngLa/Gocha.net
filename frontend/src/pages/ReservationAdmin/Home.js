import {useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { readReservationUserList } from "../../service/reservation";
import UserListComponent from "./UserListComponent";

function Home (){

const [userlist, setUserlist] = useState([]);

//예약자 목록 출력
const fetchData = async () => {
  try {
    const response = await readReservationUserList();
    setUserlist(response.data);
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

// useEffect 리랜더링 함수
const refreshList = () => {
  fetchData();
};

  return(
    <div>
      <ContentHeader menuName="예약관리"/>
    <div>
      {userlist.map((list)=>(
      <UserListComponent key={list.id} list={list} refreshList={refreshList}/>
      ))}
      
    </div>

    </div>
  );
}
export default Home