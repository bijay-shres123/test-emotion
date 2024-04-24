
const initialState = {
    // Define initial state properties here
    stories: [], // Assuming stories is an array initially
  };
  
  const storyReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_STORIES":
        // Handle action to fetch all stories
        // Update state with fetched stories
        return {
          ...state,
          stories: action.payload, // Assuming action.payload contains the fetched stories
        };
      case "CREATE_STORY":
        // Handle action to create a story
        // Update state with the new story
        return {
          ...state,
          stories: [...state.stories, action.payload], // Assuming action.payload contains the new story
        };
      default:
        return state;
    }
  };
  
  export default storyReducer;
  