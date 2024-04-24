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
