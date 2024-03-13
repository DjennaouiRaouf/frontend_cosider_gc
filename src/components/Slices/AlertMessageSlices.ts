import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AlertMessageState {
    showAlertMessage:boolean;
    message:string,
    variant:string,

}

const initialState: AlertMessageState = {
    showAlertMessage:false,
    message:'',
    variant:'',
};

export const AlertMessage = createSlice({
    name: "Alert",
    initialState,
    reducers: {
        displayAlertMessage: (state,action: PayloadAction<{ variant: string; message: string }>) => {
            state.showAlertMessage=true;
            state.message=action.payload.message;
            state.variant=action.payload.variant;
        },

        hideAlertMessage:() => initialState,




    


    }
});

export const {displayAlertMessage,hideAlertMessage } = AlertMessage.actions;

export default AlertMessage.reducer;