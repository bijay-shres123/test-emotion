// reducers/index.js
import { combineReducers } from "redux";
import storyReducer from './stories'; // Assuming you named the file storiesReducer.js
import categoryReducer from './categories';
import questionReducer from './questions';
import authenticationReducer from './authentication'; 

const rootReducer = combineReducers({
    stories: storyReducer, // Assign the correct reducer to the "stories" slice of state
    // Add other reducers here if needed
    categories: categoryReducer,
    questions: questionReducer,
    auth: authenticationReducer,
});

export default rootReducer;
