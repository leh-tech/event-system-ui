import eventReducer from "./eventReducers";
import searchReducer from "./searchReducer";

const rootReducer = {
    events: eventReducer,
    query: searchReducer
}

export default rootReducer;