import * as api from '../api'

export const getQuestions = () => async (dispatch) =>{

    try{
        const {data} = await api.fetchQuestions();
        const action ={type:"FETCH_ALL_QUESTIONS",payload:data};
        dispatch(action)
    }catch(error){
        console.log(error.message)
    }
    
}
export const createQuestion = (question) => async (dispatch) =>{

    try{
        const {data} = await api.createQuestion(question)
        dispatch({type:"CREATE_QUESTION",payload:data})
    }catch(error){
        console.log(error.message)
    }
    
}

export const updateQuestion = (id, updatedQuestion) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestion(id, updatedQuestion); // Assuming api.updateQuestion exists and handles the PUT request
        
        dispatch({ type: "UPDATE_QUESTION", payload: data });
    } catch (error) {
        
        console.log(error.message);
    }
};


export const deleteQuestionAction = (id) => async (dispatch) => {
  try {
    // Dispatch an action to indicate that the delete operation has started
    dispatch({ type: 'DELETE_QUESTION_REQUEST' });

    // Call the deleteQuestion API function to delete the question
    await api.deleteQuestion(id);

    // If the deletion was successful, dispatch an action to update the Redux store
    dispatch({ type: 'DELETE_QUESTION_SUCCESS', payload: id });
  } catch (error) {
    // If an error occurs during deletion, dispatch an action to handle the error
    dispatch({ type: 'DELETE_QUESTION_FAILURE', payload: error.message });
  }
};