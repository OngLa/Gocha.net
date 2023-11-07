import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Chevron_Left from "../../img/icon/Chevron_Left.png"

function ContentHeader(props) {
  // 페이지 좌측 상단에 표시되는 뒤로가기 & 페이지 이름 표시 박스이다.
  // 속성으로 menuName에 text를 전달.

  const { menuName } = props;
  const navigate = useNavigate();

  function handleCancel(event) {
    navigate(-1);
  }

  return (
    <div className={style.wrapper}>
      <button onClick={handleCancel}>
        <img src={Chevron_Left} alt="left" />
      </button>
      <div className={style.menuName}>{menuName}</div>
    </div>
  );
}

export default ContentHeader;
