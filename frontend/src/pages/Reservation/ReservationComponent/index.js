import CardBody from "./CardBody";



function ReservationComponent({list, refreshList}) {

  return (
     <div>
         {list.map((reservationList) => (
        <CardBody key={reservationList.id} reservationList={reservationList} refreshList={refreshList}/>
      ))}      
      </div>
  );
}
export default ReservationComponent;