import axios from "axios";

const api  =  axios.create({baseURL:"http://localhost:5001/"})

api.interceptors.request.use((req) => {
    // Check if there's a profile object in localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));
  
    // If profile exists and contains a token, add Authorization header
    if (profile && profile.token) {
      req.headers.Authorization = `Bearer ${profile.token}`;
    }
  
    return req;
  });

export const fetchCategories =()=> api.get("/categories")
export const createCategory =(category)=> api.post("/categories", category)


export const fetchQuestions =()=> api.get("/questions")
export const createQuestion =(question)=> api.post("/questions", question)
export const updateQuestion =(id,question)=> api.patch(`/questions/${id}`, question)
export const deleteQuestion =(id)=> api.delete(`/questions/${id}`);

export const login = (formValues) => api.post("/users/login", formValues);
export const signup = (formValues) => api.post("/users/signup", formValues);