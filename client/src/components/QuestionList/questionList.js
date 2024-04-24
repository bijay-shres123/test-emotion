import React from 'react';
import { Row, Col, Spin } from "antd";
import Question from '../Question';
import { useSelector } from "react-redux";

function QuestionList({ setSelectedId }) {
  // console.log(useSelector((state) => state))
  const {questions} = useSelector((state) => state.questions);

  console.log('questions', questions);

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={[48, 32]}>
      {questions.map((question) => (
        <Col key={question._id} lg={24} xl={12} xxl={8}>
          <Question setSelectedId={setSelectedId} question={question} />
        </Col>
      ))}
    </Row>
  );
}

export default QuestionList;
