import { useAppSelector, useAppDispatch } from "helpers/hooks"
import { ListGroup } from "react-bootstrap";
import { fetchEvents } from '../redux/eventReducers';
import { useCallback, useEffect, useState } from "react";
import { EventState } from '../helpers/interfaces';

import MyListGroupItem from "./MyListItem";
import AddEvent from "./AddEvent";

const EventList = () => {
    const events = useAppSelector((state) => state.events.events);
    const query = useAppSelector((state) => state.query.text);
    const updatedEvents = useAppSelector((state) => state.events.updatedEvents);
    const finishUpdate = useAppSelector((state) => state.events.updated);
    const [sortedEvents, setSortedEvents] = useState([] as EventState[]);

    const [isSorted, setIsSorted] = useState(false);
    const [initLoaded, setInitLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const loadEvents = useCallback(async () => {
        if (events.length > 0 && !isSorted) {
            
            // filter out all the events that have a OnGoing status
            let onGoingEvents: EventState[] = events.slice().filter((event, i) => (event.status === 'OnGoing'));
            // filter out all events that are not OnGoing
            let nonLiveEvents = events.slice().filter(e => (e.status !== 'OnGoing')).sort((a: any, b: any) => (new Date(a.created).valueOf() - new Date(b.created).valueOf()));
            
            // assign the onGoing array first then concat the non live events after
            setSortedEvents(onGoingEvents.concat(nonLiveEvents));
            
            setIsSorted(true)

        }
    }, [events, isSorted]);

    const updatedEventsState = useCallback(async () => {
        setIsSorted(false);
        let onGoingEvents: EventState[] = updatedEvents.slice().filter((event, i) => (event.status === 'OnGoing'));
            let nonLiveEvents = updatedEvents.slice().filter(e => (e.status !== 'OnGoing')).sort((a: any, b: any) => (new Date(a.created).valueOf() - new Date(b.created).valueOf()));
            
            // assign the onGoing array first then concat the non live events after
            setSortedEvents(onGoingEvents.concat(nonLiveEvents));
            
            setIsSorted(true)
    }, [updatedEvents]);


    
    useEffect(() => {
        if (!initLoaded) {
            dispatch(fetchEvents());
           
        }
        // run loadEvents function upon init
         loadEvents();
        setInitLoaded(true);
        
        if (finishUpdate) {
            // run updatedEventsState function to update event list
            updatedEventsState();
        }
        
        
    }, [dispatch, loadEvents,  updatedEventsState, finishUpdate, updatedEvents]);
    
    if (query.length > 0) {
        
        return <>
            <AddEvent totalEvents={sortedEvents.length} />
            <br />
            <h5>Search results</h5>
            <ListGroup>
                {sortedEvents.map((event, i) => {
                    
                   
                    // check for domain match
                    if (event.domain === query) {
                        
                        return <MyListGroupItem event={event} i={i} />
                    }

                    // check for subdomain match
                    if (event.subdomain === query) {
                        return <MyListGroupItem event={event} i={i} />
                    }
                    // check for status match
                    if (event.status === query) {
                        return <MyListGroupItem event={event} i={i} />
                    }

                    // check if query matches an owner, if match found then render the list
                    let findOwners = event.owners.findIndex(owner => owner.name === query);
                    
                    if (findOwners > 0) {
                        return  <MyListGroupItem event={events[findOwners]} i={i} />
                    }
                   return  <></>
                })}
            </ListGroup>
        </>
    }
    
   

    return <> <AddEvent totalEvents={sortedEvents.length}/> <br /><h5>Events</h5> {isSorted ? (
        
    
        <ListGroup>
            
            {
                sortedEvents.map((event, i) => (<>
                    <MyListGroupItem event={event} i={ i} />
                </>))
            }
            
        </ListGroup>
    ) : (<div>Sorting...</div>)}</>
}

export default EventList;