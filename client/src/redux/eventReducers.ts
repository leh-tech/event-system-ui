import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from './API';
import { EventState, EventStoreState, DeleteEvent } from '../helpers/interfaces';
import _ from 'underscore';


// omit imports and state

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response: EventState[] = await (await API.get('/api/events')).data;
    return response;
})

const initialState = { events: [], loadingStatus: '' } as EventStoreState

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        saveEvent: (state: EventStoreState, action: PayloadAction<EventState>) => {
            const { payload } = action;

            // add new event to array
            state.events.push(payload);
        },
        deleteEvent: (state: EventStoreState, action: PayloadAction<DeleteEvent>) => {
            const { payload } = action;
            // filter array until match found then return new array with matched filter removed

            let removed = _.reject(state, function (event: EventState) { return event.uid === payload.uid; });

            // assign new array to state
            state.events = removed;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.pending, (state, action) => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                const newEntities: EventState[] = [];
                action.payload.forEach(event => {
                    newEntities[event.id] = event
                });

                state.events = newEntities
                state.loadingStatus = 'idle'
            })
    }
});

export const { saveEvent, deleteEvent } = eventsSlice.actions
export default eventsSlice.reducer