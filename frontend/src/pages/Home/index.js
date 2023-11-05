import { Routes, Route } from "react-router-dom";
import HomeUser from "./HomeUser";
import HomeCarcenter from "./HomeCarcenter";

function Home(props) {
  return (
    <Routes>
      <Route path="" Component={HomeUser} />
      <Route path="home" Component={HomeUser} />
      <Route path="home2" Component={HomeCarcenter} />
    </Routes>
  );
}

export default Home;
