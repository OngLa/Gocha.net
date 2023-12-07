import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Oauth 로그인 실패 페이지
function LoginFail() {

  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      background: "#334E58",
      color: "#FFDA47",
      width: "80vw",
      confirmButtonColor: "#45CB85",

      title: "존재하지 않는 계정입니다.",
      html: "탈퇴한 이력이 있는 계정인지 확인해주세요.",
      icon: "error",
      confirmButtonText: "확인",
    });

    navigate("/member/login");
  }, []);
}

export default LoginFail;