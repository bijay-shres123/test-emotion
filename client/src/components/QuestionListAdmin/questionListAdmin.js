import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Row, Col, Spin } from "antd";
import Question from '../Question';
import { useSelector } from "react-redux";
import { getQuestions } from '../../actions/questions.js';

function QuestionListAdmin({ setSelectedId }) {
  const [editId, setEditId]= useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // Selector to extract the 'questions' slice from the state
  const questions = useSelector((state) => state.questions.questions);

  console.log('questions', questions);

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h2>All the Questions. Edit or Delete as required</h2>
      {questions.map((question, index) => (
        <Row
          key={question._id}
          gutter={[16, 16]}
          style={{ marginBottom: 16 }}
          justify="center" // Align items horizontally to the center
          align="middle" // Align items vertically to the middle
        >
          <Col xs={24} sm={24} md={12} lg={8}>
            <Question setSelectedId={setSelectedId} question={question} setEditId={setEditId} />
          </Col>
          {/* Add more columns if needed */}
        </Row>
      ))}
    </div>
  );
}

export default QuestionListAdmin;
