import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from './API';
import { EventState, EventStoreState, ChangeStatus } from '../helpers/interfaces';
import _ from 'underscore';
import { DeleteEvent } from 'helpers/types';
import { start } from 'repl';
import Logger from './middleware/Logger';


// omit imports and state

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response: EventState[] = await (await API.get('/api/events')).data;
    return response;
})

const initialState = { events: [], loadingStatus: '', updated: false, updatedEvents: [] } as EventStoreState;

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        saveEvent: (state: EventStoreState, action: PayloadAction<EventState>) => {
            const { payload } = action;
            let updatedList;
            if (state.updatedEvents.length > 0) {
                updatedList = state.updatedEvents;
                updatedList.push(payload);
                state.updatedEvents = updatedList;
                state.updated = true;
            }
            updatedList = state.events;
            updatedList.push(payload);
            // add new event to array
            state.updatedEvents = updatedList;
            state.updated = true;
            Logger(state);
        },
        deleteEvent: (state: EventStoreState, action: PayloadAction<DeleteEvent>) => {
            const { payload } = action;
            // filter array until match found then return new array with matched filter removed
            let removed: EventState[] = _.reject(state.events, function (event: EventState) { return event.uid === payload.uid; });
      
            // assign new array to state
            state.updatedEvents = removed;
            state.updated = true;
            Logger(state);
            
        },

        changeStatus: (state: EventStoreState, action: PayloadAction<ChangeStatus>) => {
            const { payload } = action;
            let  data = [];
            // if updatedEvents state is empty then use default events array
            if (state.updatedEvents.length > 0) {
                const index = state.updatedEvents.findIndex(event => {
                return event.uid === payload.uid;
                }); 
               
                data = state.updatedEvents;

            if (index !== -1) {
               data[index].status = payload.status;
            }
                // update the array with the new changes
                state.updatedEvents = data;
                state.updated = true;
                
                } 
                // find the index number of the specific object in an array using the uid from payload
            const index = state.events.findIndex(event => {
                return event.uid === payload.uid;
                }); 
               
                data = state.events;

            if (index !== -1) {
                // find event in the array using the index number then change the status in the event object
               data[index].status = payload.status;
            }
                
                state.updatedEvents = data;
            state.updated = true;
            Logger(state);
             
        },
        finishUpdate: (state: EventStoreState) => {
            // set state to false to indicate when the events list has finished updating
            state.updated = false;
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
                // load the initial events state with data from the backend
                state.events = newEntities
                state.loadingStatus = 'idle'
            })
    }
});

export const { saveEvent, deleteEvent, finishUpdate, changeStatus } = eventsSlice.actions
export default eventsSlice.reducer