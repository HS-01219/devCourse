import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer
});

// RetrunType은 <> 안에 들어오는 함수의 리턴타입을 추론해준다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;