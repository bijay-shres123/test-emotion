
const initialState = {
    // Define initial state properties here
    categories: [], // Assuming stories is an array initially
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_CATEGORIES":
        // Handle action to fetch all stories
        // Update state with fetched stories
        return {
          ...state,
          categories: action.payload, // Assuming action.payload contains the fetched stories
        };
      case "CREATECATEGORY":
        // Handle action to create a story
        // Update state with the new story
        return {
          ...state,
          categories: [...state.categories, action.payload], // Assuming action.payload contains the new story
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  