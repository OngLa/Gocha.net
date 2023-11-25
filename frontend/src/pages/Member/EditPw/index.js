import { Routes, Route } from "react-router-dom";
import Verification from "./Verification";
import ShowEditPw from "./ShowEditPw";

function EditPw(props) {
  return (
    <Routes>
      <Route path="" Component={Verification} />
      <Route path="editpassword" Component={ShowEditPw} />
    </Routes>
  );
}

export default EditPw;
