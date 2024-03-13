import { configureStore } from "@reduxjs/toolkit";

import AddDataModalReducer from "../Slices/AddModalSlices";
import SearchDataModalReducer from "../Slices/SearchModalSlices";
import AlertMessageReducer from "../Slices/AlertMessageSlices";

const store = configureStore({
    reducer: {
        addDataModalReducer: AddDataModalReducer,
        searchDataModalReducer: SearchDataModalReducer,
        alertMessageReducer:AlertMessageReducer,
    },

});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;