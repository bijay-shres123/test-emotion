const initialState = {
    questions: [], // Use 'questions' instead of 'question'
  };
  
  const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_QUESTIONS":
        return {
          ...state,
          questions: action.payload,
        };
      case "CREATE_QUESTION": // Correct action type
        return {
          ...state,
          questions: [...state.questions, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default questionReducer;
  