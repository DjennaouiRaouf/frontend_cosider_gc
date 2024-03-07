import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface SearchDataModalState {
    showSearchContratForm:boolean;
    showSearchClientForm:boolean;

}

const initialState: SearchDataModalState = {
    showSearchContratForm:false,
    showSearchClientForm:false,

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
    


    }
});

export const { showSearchContrat,hideSearchContrat,
showSearchClient,hideSearchClient} = SearchDataModal.actions;

export default SearchDataModal.reducer;