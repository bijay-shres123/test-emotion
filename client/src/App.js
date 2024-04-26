import React from "react";
import { Layout, Image, Typography } from "antd";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import HomePage from './Homepage';
import QuestionPage from './QuestionPage';
import QuestionListAdmin from "./components/QuestionListAdmin";
import EditQuestionPage from "./EditQuestionPage"
import AdminForm from "./components/AdminForm"
import AdminRoute from "./AdminRoute";

const { Title } = Typography;
const { Header, Footer } = Layout;


const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminForm />} />
                <Route exact path='/' element={<AdminRoute />}>
                    <Route path="category" element={<CategoryPage />} />
                </Route>
                <Route exact path='/' element={<AdminRoute />}>
                    <Route path="/admin/question" element={<QuestionPage />} />
                </Route>
                <Route exact path='/' element={<AdminRoute />}>
                    <Route path="/admin/questionlist" element={<QuestionListAdmin />} />
                </Route>
                <Route exact path='/' element={<AdminRoute />}>
                    <Route path="/admin/question/:id" element={<EditQuestionPage />} /></Route>

            </Routes>
        </Router>
    );
}

export default App;
