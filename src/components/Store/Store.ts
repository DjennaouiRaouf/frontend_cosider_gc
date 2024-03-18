import { configureStore } from "@reduxjs/toolkit";

import AddDataModalReducer from "../Slices/AddModalSlices";
import SearchDataModalReducer from "../Slices/SearchModalSlices";
import AlertMessageReducer from "../Slices/AlertMessageSlices";
import ShowDataModalReducer from "../Slices/ShowModalSlices";

const store = configureStore({
    reducer: {
        addDataModalReducer: AddDataModalReducer,
        searchDataModalReducer: SearchDataModalReducer,
        alertMessageReducer:AlertMessageReducer,
        showDataModalReducer:ShowDataModalReducer,
    },

});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;