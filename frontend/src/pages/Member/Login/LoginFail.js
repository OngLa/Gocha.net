import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Oauth 로그인 처리 페이지
function LoginFail() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryMessage = query.get("message");

    Swal.fire({
      background: "#334E58",
      color: "#FFDA47",
      width: "80vw",
      confirmButtonColor: "#45CB85",

      text: queryMessage,
      icon: "error",
      confirmButtonText: "확인",
    });

    navigate("/member/login");
  }, []);
  return (
    <div>
      <div>로그인 하는 중입니다.</div>
    </div>
  );
}
export default LoginFail;
