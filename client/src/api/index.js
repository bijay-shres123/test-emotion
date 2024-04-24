import axios from "axios";

const urlstory  = "http://localhost:5001/stories"

export const fetchStories =()=> axios.get(urlstory)
export const createStory =(story)=> axios.post(urlstory, story)

const urlcategory  = "http://localhost:5001/categories"
export const fetchCategories =()=> axios.get(urlcategory)
export const createCategory =(category)=> axios.post(urlcategory, category)

const urlquestion  = "http://localhost:5001/questions"
export const fetchQuestions =()=> axios.get(urlquestion)
export const createQuestion =(question)=> axios.post(urlquestion, question)
export const updateQuestion =(id,question)=> axios.patch(`${urlquestion}/${id}`, question)
export const deleteQuestion =(id)=> axios.delete(`${urlquestion}/${id}`);