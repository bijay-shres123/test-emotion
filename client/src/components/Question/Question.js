import React, { useState, useEffect, useMemo } from 'react';
import { Card, Tooltip, Typography, Radio, Redirect } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { Navigate } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

function Question({ question, setSelectedId, onAnswerSelect, setEditId, history }) {

  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);
  const [value, setValue] = useState(0);
  const [redirect, setRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);
  const memoizedCategories = useMemo(() => categories, [categories]);

  const onChange = (e) => {
    setValue(e.target.value);
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

  const cardActions = [
    <Tooltip placement="top" title="Edit">
      <EditOutlined
        onClick={() => handleEditClick(question._id)}
      />
    </Tooltip>,
  ];

  return (
    <>
      {/* Redirect to the edit page if redirect is true */}
      {redirect && <Navigate to={`/admin/question/${question._id}`} />}
      <Card actions={cardActions}>
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
            value={value}
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
