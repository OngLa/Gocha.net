import { useNavigate } from "react-router-dom";
import { SmallButton } from "../../components/Button";
import ContentHeader from "../../components/ContentHeader";

function Opinionpage() {

  const navigate=useNavigate();

const handleOnClick=() =>{
  alert("전송완료")
  navigate(-1)
}

  return(
<div style={{display: "flex", flexDirection:"column"}}>
<ContentHeader menuName="예약관리_정비소견"/>

<div>
    <h2 style={{color:"#fff"}}>가산 디지털점</h2>
  <h3 style={{color:"#47F6C1"}}>정비 소견 내용</h3>
</div>
<dive><textarea style={{width: "100%", height: "300px", backgroundColor:"#5D707F", border: "1px solid #45CB85", borderRadius:"15px" }} placeholder="정비 소견을 입력해 주세요"></textarea></dive>
  
  <div style={{display:"flex" ,justifyContent:"center", marginTop:"20px"}}><SmallButton onClick={handleOnClick}>보내기</SmallButton></div>
  </div>
  
  );
}
export default Opinionpage;