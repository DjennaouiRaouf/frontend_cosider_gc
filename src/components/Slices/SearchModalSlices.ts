import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;
    showSearchDQEForm:boolean;
    showSearchCamionForm:boolean;

}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,
    showSearchDQEForm:false,
    showSearchCamionForm:false,

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
showSearchCamion,hideSearchCamion} = SearchDataModal.actions;

export default SearchDataModal.reducer;