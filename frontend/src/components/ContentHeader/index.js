import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

function ContentHeader(props) {
  const { menuName } = props;
  const navigate = useNavigate();

  function handleCancel(event) {
    navigate(-1);
  }

  return (
    <div className={style.wrapper}>
      <button onClick={handleCancel}>
        <img src="/icon/Chevron_Left.png" alt="left" />
      </button>
      <div className={style.menuName}>{menuName}</div>
    </div>
  );
}

export default ContentHeader;
