import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataModalState {
    showAddContratForm:boolean;
    showAddClientForm:boolean;

}

const initialState: AddDataModalState = {
    showAddContratForm:false,
    showAddClientForm:false,

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
    
    


    }
});

export const { showAddContrat,hideAddContrat,
showAddClient,hideAddClient} = AddDataModal.actions;

export default AddDataModal.reducer;