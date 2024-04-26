import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import HomePage from './Homepage';
import QuestionPage from './QuestionPage';
import QuestionListAdmin from "./components/QuestionListAdmin";
import EditQuestionPage from "./EditQuestionPage"
import AdminForm from "./components/AdminForm"
import AdminRoute from "./AdminRoute";
import NotFound from"./NotFound"


const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminForm />} />
                <Route  path='/' element={<AdminRoute />}>
                    <Route path="category" element={<CategoryPage />} />
                </Route>
                <Route  path='/' element={<AdminRoute />}>
                    <Route path="/admin/question" element={<QuestionPage />} />
                </Route>
                <Route  path='/' element={<AdminRoute />}>
                    <Route path="/admin/questionlist" element={<QuestionListAdmin />} />
                </Route>
                <Route  path='/' element={<AdminRoute />}>
                    <Route path="/admin/question/:id" element={<EditQuestionPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Router>
    );
}

export default App;
