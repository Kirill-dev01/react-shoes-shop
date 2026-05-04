import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchQuery: string;
}

const initialState: SearchState = {
    searchQuery: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // Действие для изменения текста поиска
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        // Действие для очистки поиска
        clearSearch(state) {
            state.searchQuery = '';
        }
    },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;