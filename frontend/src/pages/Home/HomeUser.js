import style from "./homeUser.module.css";

function HomeUser() {
  return (
    <div className={style.homeWrap} id={style.homeWrapId}>
      <img src="./homeBackground.png" alt="homeBackground" className={style.homeBackground} />
    </div>
  );
}

export default HomeUser;
