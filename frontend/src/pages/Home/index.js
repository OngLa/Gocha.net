import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import homeBackground from "../../img/homeBackground.png";

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Set interval to toggle isHovered every second
    const intervalId = setInterval(() => {
      setIsHovered((prevHovered) => !prevHovered);
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div
      className={`${style.homeWrap} ${isHovered ? style.hovered : ""}`}
    >
      <img
        src={homeBackground}
        alt="homeBackground"
        className={style.homeBackground}
      />
    </div>
  );
}

export default Home;
