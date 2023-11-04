import style from './style.module.css'
import { useNavigate } from "react-router-dom";

function ContentHeader(props) {
  const { menuName } = props;
  const navigate = useNavigate();

  function handleCancel(event) {
    navigate(-1);
  }

  return (
    <button className={style.wrapper} onClick={handleCancel}>
      <img src="/icon/Chevron_Left.png" alt="left"/>
      <div className={style.menuName}>{menuName}</div>
    </button>
  );
}

export default ContentHeader;
