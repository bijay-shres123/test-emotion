import React from 'react';
import { Row, Col, Spin } from "antd";
import Story from '../Story';
import { useSelector } from "react-redux";

function StoryList({ setSelectedId }) {
  const { stories } = useSelector((state) => state.stories); // Destructure stories from state.stories

  console.log('stories', stories);

  // Check if stories is not an array or is empty
  if (!Array.isArray(stories) || stories.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Render stories if it's an array and not empty
  return (
    <Row gutter={[48, 32]}>
      {stories.map((story) => (
        <Col key={story._id} lg={24} xl={12} xxl={8}>
          <Story setSelectedId={setSelectedId} story={story} />
        </Col>
      ))}
    </Row>
  );
}



export default StoryList;