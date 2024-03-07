import { configureStore } from "@reduxjs/toolkit";
import AddDataModalReducer from "../Slices/AddModalSlices";
import SearchDataModalReducer from "../Slices/SearchModalSlices";
const store = configureStore({
    reducer: {
        addDataModalReducer: AddDataModalReducer,
        searchDataModalReducer: SearchDataModalReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;