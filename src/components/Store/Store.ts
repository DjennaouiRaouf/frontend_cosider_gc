import { configureStore } from "@reduxjs/toolkit";
import AddDataModalReducer from "../Slices/ModalSlices";

const store = configureStore({
    reducer: {
        addDataModalReducer: AddDataModalReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;