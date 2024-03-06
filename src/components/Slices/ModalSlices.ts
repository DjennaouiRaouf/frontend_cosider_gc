import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;

}

const initialState: AddDataModalState = {
    showAddContratForm:false,

};

export const AddDataModal = createSlice({
    name: "AddDG",
    initialState,
    reducers: {
        showAddContrat: (state) => {

            state.showAddContratForm=true

        },
        hideAddContrat: (state) => {
            state.showAddContratForm=false
        },
    


    }
});

export const { showAddContrat,hideAddContrat} = AddDataModal.actions;

export default AddDataModal.reducer;