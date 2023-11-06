import style from "./homeCarcenter.module.css";

function homeCarcenter() {
  return (
    <div className={style.homeWrap} id={style.homeWrapId}>
      <div>정비소Home</div>
      <img
        src="./homeBackground.png"
        alt="homeBackground"
        className={style.homeBackground}
      />
    </div>
  );
}

export default homeCarcenter;
