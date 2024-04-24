import React from "react";
import { Layout, Image, Typography } from "antd";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import HomePage from './Homepage';
import QuestionPage from './QuestionPage';

const { Title } = Typography;
const { Header, Footer } = Layout;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/question" element={<QuestionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
