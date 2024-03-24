import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface Obj {
    [key: string]: any;
}
export interface EditDataModalState {
    showEditDQEForm:any;

}

const initialState: EditDataModalState = {
    showEditDQEForm:{
        id:'',
        shown:false,
        state:[],
        fields:[],
        loadingFields: 'idle',
        loadingState: 'idle',
        errorFields: null,
        errorState: null,
    },
};



export const fetchState:any = createAsyncThunk('data', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data.state;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});

export const fetchFields:any = createAsyncThunk('fields', async (params:  any) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params}`);
        return response.data.fields;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});



export const EditDataModal = createSlice({
    name: "Edit",
    initialState,
    reducers: {

         showEditDQE: (state,action: PayloadAction<{id:string}>) => {
             state.showEditDQEForm.id=action.payload.id
             state.showEditDQEForm.shown=true
        },
        hideEditDQE: (state) => {
            state.showEditDQEForm={
                 id:'',
                shown:false,
                state:[],
                fields:[],
                loadingFields: 'idle',
                loadingState: 'idle',
                errorFields: null,
                errorState: null,
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchState.pending, (state) => {
                state.showEditDQEForm.loadingState = 'pending';
            })

            .addCase(fetchFields.pending, (state) => {
                state.showEditDQEForm.loadingFields = 'pending';
            })

            .addCase(fetchState.fulfilled, (state, action) => {
                state.showEditDQEForm.loadingState = 'fulfilled';
                state.showEditDQEForm.state = action.payload;

            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.showEditDQEForm.loadingFields = 'fulfilled';
                state.showEditDQEForm.fields = action.payload;

            })
            .addCase(fetchState.rejected, (state, action) => {
                state.showEditDQEForm.loadingState = 'rejected';
                state.showEditDQEForm.errorState = action.error.message || 'An error occurred';
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.showEditDQEForm.loadingFields = 'rejected';
                state.showEditDQEForm.errorFields = action.error.message || 'An error occurred';
            });

    },
});

export const {showEditDQE,hideEditDQE} = EditDataModal.actions;

export default EditDataModal.reducer;