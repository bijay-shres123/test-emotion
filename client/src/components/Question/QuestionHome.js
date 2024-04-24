import React, { useState, useEffect, useMemo } from 'react';
import { Card, Tooltip, Typography, Radio, Redirect, message } from 'antd';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { Navigate } from 'react-router-dom';
import { delteStory } from '../../actions/questions.js';
import { deleteQuestion } from '../../api/index.js';
import styles from './styles.js';

const { Meta } = Card;
const { Paragraph } = Typography;

function Question({
  question,
  setSelectedId,
  onAnswerSelect,
  setEditId,
  history,
}) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);
  const [value, setValue] = useState(0);
  const [redirect, setRedirect] = useState(false); // State to control redirection
  const [radioValue, setRadioValue] = useState('');
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);
  const memoizedCategories = useMemo(() => categories, [categories]);

  const onChange = (e) => {
    setRadioValue(e.target.value);
    onAnswerSelect(e.target.value);
  };

  const getCategoryName = () => {
    if (typeof memoizedCategories !== 'object' || memoizedCategories === null) {
      return 'Unknown Category';
    }

    const new_categories = memoizedCategories.categories;

    const category = new_categories.find(
      (cat) => cat._id === question.category
    );

    // Return category name if found, otherwise return 'Unknown Category'
    return category ? category.name : 'Unknown Category';
  };

  const handleEditClick = (questionId) => {
    // Set redirect to true to trigger redirection
    setRedirect(true);
  };
  const handleDelete = async () => {
    try {
      console.log('Deleting question...');
      // Dispatch the deleteQuestion action
      await dispatch(deleteQuestion(question._id));
      console.log('Successfully deleted');
      // If deletion is successful, display a success message
      message.success('Question deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting question:', error);
      // If an error occurs during deletion, display an error message
      message.error('Failed to delete question');
      window.location.reload();
    }
  };

  const cardActions = [];

  return (
    <>
      {/* Redirect to the edit page if redirect is true */}
      {redirect && <Navigate to={`/admin/question/${question._id}`} />}
      <Card actions={cardActions} style={styles.card}>
        <Meta title={getCategoryName()} />
        <Meta title={question.text} />
        <Paragraph
          style={{ margin: 0 }}
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: 'more',
            onExpand: () => {
              setExpand(true);
            },
            onEllipsis: () => {
              setExpand(false);
            },
          }}
        >
          <Radio.Group
            onChange={onChange}
            value={radioValue} // Make sure value is initially null or undefined
            style={{ width: '100%' }}
          >
            {question.answers.map((answer, index) => (
              <Radio key={index} value={index} style={{ marginBottom: '10px' }}>
                <strong>{answer.text}</strong> - Score: {answer.score}
              </Radio>
            ))}
          </Radio.Group>
        </Paragraph>
      </Card>
    </>
  );
}

export default Question;
