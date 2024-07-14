import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;
    showAddClientForm:boolean;
    showAddDQEForm:boolean;
    showAddPlaningForm:boolean;
    showAddBLForm:boolean;
    showAddCamionForm:boolean;
    showAddFactureForm:boolean;
    showAddAvanceForm:boolean;
}

const initialState: AddDataModalState = {
    showAddContratForm:false,
   
    
    showAddClientForm:false,
    showAddDQEForm:false,
    showAddPlaningForm:false,
    
    showAddBLForm:false,
    showAddCamionForm:false,
    showAddFactureForm:false,
    showAddAvanceForm:false,

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

        showAddPlaning: (state) => {
        
            state.showAddPlaningForm=true

        },
        hideAddPlaning: (state) => {
            state.showAddPlaningForm=false
        },



         showAddAvance: (state) => {

            state.showAddAvanceForm=true

        },
        hideAddAvance: (state) => {
            state.showAddAvanceForm=false
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
    showAddAvance,hideAddAvance,
showAddDQE,hideAddDQE,
showAddBL,hideAddBL,
showAddCamion,hideAddCamion,
showAddPlaning,hideAddPlaning,
showAddFacture,hideAddFacture} = AddDataModal.actions;

export default AddDataModal.reducer;