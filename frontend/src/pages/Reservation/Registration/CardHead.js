
function CardHead(props) {


  //액시오스로 데이터 받아옴 {id: ""}
  return(
  <div className="CardHead">

<h2>{props.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
{props.name}</h2>


  </div>
);
}
export default CardHead;