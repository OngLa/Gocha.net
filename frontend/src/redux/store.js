import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    // colorReducer,
    authReducer
  }
});

export default store;