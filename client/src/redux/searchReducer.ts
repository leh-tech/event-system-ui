import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../helpers/types';
import Logger from './middleware/Logger';

const initialState = { text: '' } as SearchState;

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchQuery: (state: SearchState, action: PayloadAction<SearchState>) => {
            const { payload } = action;
            // check if text is different, if it is then change the state to new text
            if (state.text !== payload.text) {
                    state.text = payload.text;
            }
            Logger(state)
        }
    }
});

export const { searchQuery } = searchSlice.actions
export default searchSlice.reducer