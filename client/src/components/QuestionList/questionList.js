import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography, Spin } from 'antd';
import QuestionHome from '../Question/QuestionHome';
import { getCategories } from '../../actions/categories.js';
import styles from './styles.js';

const { Title, Text } = Typography;

function QuestionList({ setSelectedId }) {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const [categoryScores, setCategoryScores] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(0));
  const [categoryTotalScores, setCategoryTotalScores] = useState({});


  const checkAllFieldsFilled = () => {
    const values = form.getFieldsValue();
    const allFieldsFilled = Object.values(values).every(
      (value) => value !== undefined && value !== ''
    );
    return allFieldsFilled;
  };


  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setShowAnimation(true);
  }, []);


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);
  const memoizedCategories = useMemo(() => categories, [categories]);

  const getCategoryName = (categoryId) => {
    if (!memoizedCategories || !memoizedCategories.categories || !Array.isArray(memoizedCategories.categories)) {
      return 'Unknown Category';
    }

    const category = memoizedCategories.categories.find((cat) => cat._id === categoryId);

    // Return category name if found, otherwise return 'Unknown Category'
    return category ? category.name : 'Unknown Category';
  };

  const [form] = Form.useForm();

  const onSubmit = () => {
    // Initialize updatedCategoryScores
    const updatedCategoryScores = {};
  
    // Initialize updatedCategoryTotalScores
    const updatedCategoryTotalScores = {};
  
    // Accumulate scores for each category
    questions.forEach((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const answer = question.answers[selectedAnswerIndex];
      if (answer) {
        const categoryName = getCategoryName(question.category);
        updatedCategoryScores[categoryName] = (updatedCategoryScores[categoryName] || 0) + answer.score;
        updatedCategoryTotalScores[categoryName] = (updatedCategoryTotalScores[categoryName] || 0) + 5;
      }
    });
  
    // Update categoryScores state
    setCategoryScores(updatedCategoryScores);
    setCategoryTotalScores(updatedCategoryTotalScores);
  
    // Log total scores for each category
    console.log('Category Scores:', updatedCategoryScores);
    console.log('Category Total Scores:', updatedCategoryTotalScores);
    setShowMessage(true);
  };

  return (
    <Form
      form={form}
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
                setSelectedAnswers((prevSelectedAnswers) => {
                  const updatedSelectedAnswers = [...prevSelectedAnswers];
                  updatedSelectedAnswers[index] = selectedAnswerIndex;
                  return updatedSelectedAnswers;
                })
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
          htmlType="submit"
          disabled={!checkAllFieldsFilled()} // Disable button if any field is empty
        >
          Submit
        </Button>
      </div>
      {showMessage && (
        <div>
      {Object.keys(categoryScores).length !== 0 ? (
        <div
          className={showAnimation ? 'fade-in' : ''}
          style={showAnimation ? styles.result : { display: 'none' }}
        >
          <Title level={4}>Your Score as per different categories are:</Title>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={styles.cell}><Text strong>Category</Text></td>
                <td style={styles.cell}><Text strong>Score</Text></td>
                <td style={styles.cell}><Text strong>Total</Text></td>
              </tr>
              {Object.entries(categoryScores).map(([category, score]) => (
                <tr key={category}>
                  <td style={styles.cell}><Text strong>{category}</Text></td>
                  <td style={styles.cell}>{score}</td>
                  <td style={styles.cell}>{categoryTotalScores[category]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
          <Title style={styles.title}>Please Fillup the Form</Title>
        </div>
      )}
    </div>
      )}
    </Form>
  );
}

export default QuestionList;