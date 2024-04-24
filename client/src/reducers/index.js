// reducers/index.js
import { combineReducers } from "redux";
import storyReducer from './stories'; // Assuming you named the file storiesReducer.js
import categoryReducer from './categories';
import questionReducer from './questions';

const rootReducer = combineReducers({
    stories: storyReducer, // Assign the correct reducer to the "stories" slice of state
    // Add other reducers here if needed
    categories: categoryReducer,
    questions: questionReducer,
});

export default rootReducer;
