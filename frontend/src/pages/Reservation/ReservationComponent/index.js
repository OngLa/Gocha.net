import CardBody from "./CardBody";



function ReservationComponent({list}) {

  return (
     <div>
         {list.map((reservationList) => (
        <CardBody key={reservationList.id} reservationList={reservationList} />
      ))}      
      </div>
      //list에 저장된 데이터의 id기준으로 컴포넌트를 목록으로 출력 한다.
  
  );
}
export default ReservationComponent;