import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface Obj {
    [key: string]: any;
}
export interface ShowDataModalState {
 
    showDetBLItemForm:any;

}

export const fetchBLItemData:any = createAsyncThunk('data', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});

export const fetchBLItemFields:any = createAsyncThunk('fields', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data.fields;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});



const initialState: ShowDataModalState = {
    showDetBLItemForm:{
        id:'',
        shown:false,
        data:[],
        field:[],
        loadingData: 'idle',
        loadingState: 'idle',
        errorData: null,
        errorState: null,
    },



};

export const ShowDataModal = createSlice({
    name: "Show",
    initialState,
    reducers: {
        showDetBLItem: (state,action: PayloadAction<{id:string}>) => {
            state.showDetBLItemForm.id=action.payload.id
            state.showDetBLItemForm.shown=true
        },
        hideDetBLItem: (state) => {
            state.showDetBLItemForm={
                        id:'',
                        shown:false,
                        data:[],
                        field:[],
                        loadingData: 'idle',
                        loadingState: 'idle',
                        errorData: null,
                        errorState: null,
                    }

        },
    },
      extraReducers: (builder) => {
        builder
            .addCase(fetchBLItemData.pending, (state) => {
                state.showDetBLItemForm.loadingData = 'pending';
            })

            .addCase(fetchBLItemFields.pending, (state) => {
                state.showDetBLItemForm.loadingField = 'pending';
            })

            .addCase(fetchBLItemData.fulfilled, (state, action) => {
                state.showDetBLItemForm.loadingData = 'fulfilled';
                state.showDetBLItemForm.data = action.payload;

            })
            .addCase(fetchBLItemFields.fulfilled, (state, action) => {
                state.showDetBLItemForm.loadingField = 'fulfilled';
                state.showDetBLItemForm.field = action.payload;

            })
            .addCase(fetchBLItemData.rejected, (state, action) => {
                state.showDetBLItemForm.loadingData = 'rejected';
                state.showDetBLItemForm.errorData = action.error.message || 'An error occurred';
            })
            .addCase(fetchBLItemFields.rejected, (state, action) => {
                state.showDetBLItemForm.loadingField = 'rejected';
                state.showDetBLItemForm.errorField = action.error.message || 'An error occurred';
            });

    },
});

export const {showDetBLItem,hideDetBLItem} = ShowDataModal.actions;

export default ShowDataModal.reducer;