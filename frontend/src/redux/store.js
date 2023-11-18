import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const store = configureStore({
  // reducer는 action 받아 새로운 state를 만든다.
  // 이걸 store 로 넘겨줘서 화면에 보여줄 수 있다.
  // state를 변경해주는 reducer를 여기서 등록해준다.
  reducer: {
    authReducer,
  },
});

export default store;
