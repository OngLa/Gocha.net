import Signup from "../Member/Signup";
import style from "./index.module.css";

function Home() {
  return (
    <div>
       <div className={style.homeWrap}>
        <img src="./homeBackground.png" alt="homeBackground" className={style.homeBackground} /> 
      </div>
    </div>
  );
}

export default Home;
