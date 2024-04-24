import React, { useState } from 'react';
import { Row, Col, Spin, Form, Button } from 'antd';
import Question from '../Question';
import { useSelector } from 'react-redux';

function QuestionList({ setSelectedId }) {
  const { questions } = useSelector((state) => state.questions);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(0));

  const categoryScores = {}; // Dictionary to store scores for each category

  const onAnswerSelect = (index, selectedAnswerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = [...prevSelectedAnswers];
      updatedSelectedAnswers[index] = selectedAnswerIndex;
      return updatedSelectedAnswers;
    });
  };

  const onSubmit = () => {
    // Reset category scores
    Object.keys(categoryScores).forEach((category) => {
      categoryScores[category] = 0;
    });

    // Accumulate scores for each category
    questions.forEach((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const answer = question.answers[selectedAnswerIndex];
      if (answer) {
        const category = question.category;
        categoryScores[category] = (categoryScores[category] || 0) + answer.score;
      }
    });

    // Log total scores for each category
    console.log('Category Scores:', categoryScores);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      size="middle"
      onFinish={onSubmit}
    >
      <Row gutter={[48, 32]}>
        {questions.map((question, index) => (
          <Col key={question._id} lg={24} xl={12} xxl={8}>
            <Question
              setSelectedId={setSelectedId}
              question={question}
              selectedAnswerIndex={selectedAnswers[index]}
              onAnswerSelect={(selectedAnswerIndex) => onAnswerSelect(index, selectedAnswerIndex)}
            />
          </Col>
        ))}
      </Row>
      <Button type="primary" block htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default QuestionList;
