import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface EditDataModalState {
    showEditDQEForm:boolean;

}

const initialState: EditDataModalState = {
    showEditDQEForm:false,
};

export const EditDataModal = createSlice({
    name: "Edit",
    initialState,
    reducers: {

         showEditDQE: (state) => {

            state.showEditDQEForm=true

        },
        hideEditDQE: (state) => {
            state.showEditDQEForm=false
        },


    }
});

export const {showEditDQE,hideEditDQE} = EditDataModal.actions;

export default EditDataModal.reducer;