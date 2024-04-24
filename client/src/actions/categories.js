import * as api from '../api'

export const getCategories = () => async (dispatch) =>{

    try{
        const {data} = await api.fetchCategories();
        const action ={type:"FETCH_ALL_CATEGORIES",payload:data};
        dispatch(action)
    }catch(error){
        console.log(error.message)
    }
    
}
export const createCategory = (category) => async (dispatch) =>{

    try{
        const {data} = await api.createCategory(category)
        dispatch({type:"CREATE_CATEGORY",payload:data})
    }catch(error){
        console.log(error.message)
    }
    
}