import CardBody from "./CardBody";



function ReservationComponent({list}) {

  return (
       //예약목록 출력
     <div>
         {list.map((reservationList) => (
        <CardBody key={reservationList.id} reservationList={reservationList} />
      ))}      
      </div>
  );
}
export default ReservationComponent;