import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
    showAddAvanceForm:boolean;
    showAddAvenantForm:any;
}

const initialState: AddDataModalState = {
    showAddContratForm:false,
    showAddAvenantForm:{
        flag:false,
        id:null
    },
    showAddClientForm:false,
    showAddDQEForm:false,
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

        showAddAvenant: (state,action: PayloadAction<any>) => {
            console.log(action.payload);
            state.showAddAvenantForm={
                flag:true,
                id:action.payload
            }
            
        },
        hideAddAvenant: (state) => {
            state.showAddAvenantForm={
                flag:true,
                id:null
            }
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
showAddAvenant,hideAddAvenant,
showAddFacture,hideAddFacture} = AddDataModal.actions;

export default AddDataModal.reducer;