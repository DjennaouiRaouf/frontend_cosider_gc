import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;
    showAddClientForm:boolean;
    showAddDQEForm:boolean;
    showAddBLForm:boolean;
    showAddCamionForm:boolean;
    showAddFactureForm:boolean;
}

const initialState: AddDataModalState = {
    showAddContratForm:false,
    showAddClientForm:false,
    showAddDQEForm:false,
    showAddBLForm:false,
    showAddCamionForm:false,
    showAddFactureForm:false,


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

        showAddCamion: (state) => {

            state.showAddCamionForm=true

        },
        hideAddCamion: (state) => {
            state.showAddCamionForm=false
        },

        showAddFacture: (state) => {

            state.showAddFactureForm=true

        },
        hideAddFacture: (state) => {
            state.showAddFactureForm=false
        },



    }
});

export const { showAddContrat,hideAddContrat,
showAddClient,hideAddClient,
showAddDQE,hideAddDQE,
showAddBL,hideAddBL,
showAddCamion,hideAddCamion,
showAddFacture,hideAddFacture} = AddDataModal.actions;

export default AddDataModal.reducer;