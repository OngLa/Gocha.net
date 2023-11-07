import style from "./homeUser.module.css";
import homeBackground from "../../img/homeBackground.png";

function HomeUser() {
  return (
    <div className={style.homeWrap} id={style.homeWrapId}>
      <img
        src={homeBackground}
        alt="homeBackground"
        className={style.homeBackground}
      />
    </div>
  );
}

export default HomeUser;
