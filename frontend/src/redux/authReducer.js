import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  // 새로고침시 메모리에 있던 토큰이 날아감. -> 다시 렌더링되며 localStorage에 있는 토큰을 다시 가져와 넣도록해줌. 맨처음에 없으면 ""로 넣기.
  initialState: {
    user: localStorage.getItem("user") || "",
    role: localStorage.getItem("role") || "",
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },

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
