import React, { useState } from 'react';
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Radio } from 'antd';

import styles from './styles';

const { Meta } = Card;
const { Paragraph } = Typography;

function Question({ question, setSelectedId }) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const cardActions = [
    <Tooltip
      placement='top'
      title='Edit'
    >
      <EditOutlined onClick={() => {
        setSelectedId(question._id);
      }} />
    </Tooltip>
  ];

  return (
    <Card
      style={styles.card}
      cover={<Image src={question.image} />}
      actions={
        user?.result?._id === question?.userId ?
          cardActions :
          user?.result ?
            cardActions.slice(0, 1)
            : null
      }
    >
      <Meta title={question.text} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          }
        }}
      >
        <Radio.Group onChange={onChange} value={value}>
        {question.answers.map((answer, index) => (
        <Radio value={index}>
          <strong>{answer.text}</strong> - Score: {answer.score}
        </Radio>
        ))}
        </Radio.Group>
      </Paragraph>
      <br />
    </Card>
  )
}

export default Question;
