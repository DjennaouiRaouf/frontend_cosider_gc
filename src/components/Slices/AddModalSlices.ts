import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;
    showAddClientForm:boolean;
    showAddDQEForm:boolean;
    showAddBLForm:boolean;

}

const initialState: AddDataModalState = {
    showAddContratForm:false,
    showAddClientForm:false,
    showAddDQEForm:false,
    showAddBLForm:false,

};

export const AddDataModal = createSlice({
    name: "Add",
    initialState,
    reducers: {
        showAddContrat: (state) => {

            state.showAddContratForm=true

        },
        hideAddContrat: (state) => {
            state.showAddContratForm=false
        },
        
           showAddClient: (state) => {

            state.showAddClientForm=true

        },
        hideAddClient: (state) => {
            state.showAddClientForm=false
        },
    
         showAddDQE: (state) => {

            state.showAddDQEForm=true

        },
        hideAddDQE: (state) => {
            state.showAddDQEForm=false
        },

          showAddBL: (state) => {

            state.showAddBLForm=true

        },
        hideAddBL: (state) => {
            state.showAddBLForm=false
        },




    }
});

export const { showAddContrat,hideAddContrat,
showAddClient,hideAddClient,
showAddDQE,hideAddDQE,
showAddBL,hideAddBL} = AddDataModal.actions;

export default AddDataModal.reducer;