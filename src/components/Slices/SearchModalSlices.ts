import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;
    showSearchDQEForm:boolean;

}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,
    showSearchDQEForm:false,

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



    }
});

export const { showSearchContrat,hideSearchContrat,
showSearchClient,hideSearchClient,
showSearchDQE,hideSearchDQE} = SearchDataModal.actions;

export default SearchDataModal.reducer;