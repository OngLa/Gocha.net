import CardBody from "./CardBody";

function ReservationComponent({list}) {

  return (
    
      <div>
         {list.map((reservationList) => (
        <CardBody key={reservationList.id} reservationList={reservationList} />
      ))}      
      </div>
  
  );
}
export default ReservationComponent;