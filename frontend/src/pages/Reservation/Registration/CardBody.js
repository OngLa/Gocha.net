import { useNavigate } from "react-router";
import { SmallButton } from "../../../components/Button";
import styels from "./Registration.module.css";

function CardBody(props) {
  
const navigate= useNavigate();

  const handleRegisterClick = () => {
    alert("테스트");
    navigate(-1);
    // post로 데이터를 보내야지
  };
  
  return (
    <div className={styels.cardBody}>
      <h2>{props.address}</h2>

      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
      >
        <SmallButton onClick={handleRegisterClick}>등록하기</SmallButton>
      </div>
 
    </div>
  );
}
export default CardBody;
