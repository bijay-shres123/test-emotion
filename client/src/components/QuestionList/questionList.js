import React, { useState } from 'react';
import { Row, Col, Spin, Form, Button } from 'antd';
import QuestionHome from '../Question/QuestionHome';
import { useSelector } from 'react-redux';
import styles from './styles.js';

function QuestionList({ setSelectedId }) {
  const { questions } = useSelector((state) => state.questions);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(0)
  );

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
        categoryScores[category] =
          (categoryScores[category] || 0) + answer.score;
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
      {questions.map((question, index) => (
        <Row
          key={question._id}
          gutter={[48, 32]}
          justify="center"
          style={styles.row}
        >
          <Col span={24}>
            <QuestionHome
              setSelectedId={setSelectedId}
              question={question}
              selectedAnswerIndex={selectedAnswers[index]}
              onAnswerSelect={(selectedAnswerIndex) =>
                onAnswerSelect(index, selectedAnswerIndex)
              }
            />
          </Col>
        </Row>
      ))}
      <div style={styles.buttonContainer}>
        <Button
          style={
            isHovered
              ? { ...styles.button, ...styles.buttonHover }
              : styles.button
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default QuestionList;
