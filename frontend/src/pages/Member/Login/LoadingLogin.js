import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addAuthHeader } from "../../../service/axiosConfig";
import { setAccessToken, setRole, setUser } from "../../../redux/authReducer";

// Oauth 로그인 처리 페이지
function LoadingLogin() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryEmail = query.get("email");
    const queryRole = query.get("role");
    const queryAccessToken = query.get("accessToken");
    addAuthHeader(queryAccessToken);
    dispatch(setUser({ user: queryEmail }));
    dispatch(setRole({ role: queryRole }));
    dispatch(setAccessToken({ accessToken: queryAccessToken }));
    navigate("/");
  }, []);
  return (
    <div>
      
      <div>로그인 하는 중입니다.</div>
    </div>
  );
}
export default LoadingLogin;
