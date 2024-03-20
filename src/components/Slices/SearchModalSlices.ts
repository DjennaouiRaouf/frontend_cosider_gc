import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}

export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;
    showSearchDQEForm:boolean;
    showSearchCamionForm:boolean;
    showSearchBLForm:boolean;

}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,
    showSearchDQEForm:false,
    showSearchCamionForm:false,
    showSearchBLForm:false,

};

export const SearchDataModal = createSlice({
    name: "Search",
    initialState,
    reducers: {
        showSearchContrat: (state) => {

            state.showSearchContratForm=true

        },
        hideSearchContrat: (state) => {
            state.showSearchContratForm=false
        },
         showSearchClient: (state) => {

            state.showSearchClientForm=true

        },
        hideSearchClient: (state) => {
            state.showSearchClientForm=false
        },
        showSearchDQE: (state) => {

            state.showSearchDQEForm=true

        },
        hideSearchDQE: (state) => {
            state.showSearchDQEForm=false
        },

        showSearchBL: (state) => {
            state.showSearchBLForm=true
        },
        hideSearchBL: (state) => {
            state.showSearchBLForm=false
        },



            showSearchCamion: (state) => {

            state.showSearchCamionForm=true

        },
        hideSearchCamion: (state) => {
            state.showSearchCamionForm=false
        },



    }
});

export const { showSearchContrat,hideSearchContrat,
showSearchClient,hideSearchClient,
showSearchDQE,hideSearchDQE,
showSearchBL,hideSearchBL,
showSearchCamion,hideSearchCamion} = SearchDataModal.actions;

export default SearchDataModal.reducer;