import Signup from "../Member/Signup";
import style from "./index.module.css";

function Home() {
  return (
    <div className={style.homeWrap} id={style.homeWrapId}>
      <img src="./homeBackground.png" alt="homeBackground" className={style.homeBackground} />
    </div>
  );
}

export default Home;
