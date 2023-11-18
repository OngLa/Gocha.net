import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  // 원래는 새로고침시 메모리에 있던 토큰이 날아감.
  // 그래서 다시 렌더링될 때 localStorage에 있는 토큰을 다시 가져와 넣도록해줌.
  // 로그인 전의 경우엔 localstorage가 비어있으니 ""로 넣기.
  initialState: {
    user: localStorage.getItem("user") || "",
    role: localStorage.getItem("role") || "",
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },

  // Redux에는 action/reducer/store가 있음.
  // action은 앱에서 store로 운반할 데이터(상태 변화를 담은 객체)
  // reducer는 action 받아 새로운 state를 만든다.
  // 이걸 store 로 넘겨줘서 화면에 보여줌.

  // reducer로서 로그인 시 user/role/token을 localstorage, redux에 등록한다.
  reducers: {
    setUser(prevState, action) {
      localStorage.setItem("user", action.payload.user);
      return { ...prevState, user: action.payload.user };
    },
    setRole(prevState, action) {
      localStorage.setItem("role", action.payload.role);
      return { ...prevState, role: action.payload.role };
    },
    setAccessToken(prevState, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
      return { ...prevState, accessToken: action.payload.accessToken };
    },
    setRefreshToken(prevState, action) {
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return { ...prevState, refreshToken: action.payload.refreshToken };
    },
  },
});

export const { setUser, setRole, setAccessToken, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
