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
      case "CREATE_QUESTION":
        return {
          ...state,
          questions: [...state.questions, action.payload],
        };
      case "UPDATE_QUESTION": // New action type for updating a question
        // Find the index of the question to update
        const updatedIndex = state.questions.findIndex(question => question._id === action.payload._id);
        // If the question is found, update it; otherwise, return the current state
        if (updatedIndex !== -1) {
          const updatedQuestions = [...state.questions];
          updatedQuestions[updatedIndex] = action.payload;
          return {
            ...state,
            questions: updatedQuestions,
          };
        } else {
          return state;
        }
      default:
        return state;
    }
  };
  
  export default questionReducer;
  