// Question
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.js';
import { Layout,Card, Form, Input, Typography, Button, Select, Space, InputNumber, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createQuestion } from './actions/questions.js';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Navbar from './components/Layout/Navbar.js';


const { Title } = Typography;
const {Footer}= Layout;
function QuestionPage({ selectedId }) {
  // Destructure props to get selectedId
  const [categories, setCategories] = useState([]);
  const question = useSelector((state) => {
    if (selectedId && Array.isArray(state.questions)) {
      console.log('here');
      return state.questions.find((question) => question._id === selectedId);
    } else {
      console.log('down');
      return null;
    }
  });

  useEffect(() => {
    // Fetch categories data from your backend API
    fetch('http://localhost:5001/categories')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched categories data to the state
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Run this effect only once on component mount

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Initialize form with question data if it exists
  useEffect(() => {
    if (question) {
      form.setFieldsValue(question); // Use setFieldsValue to set form values
    }
  }, [question]); // Trigger effect when question changes

  const onSubmit = async (formValues) => {
    try {
      // Dispatch the createQuestion action
      await dispatch(createQuestion(formValues));

      // Show a success message if the creation is successful
      message.success('Question created successfully');

      form.resetFields();
    } catch (error) {
      // Handle any errors here, if needed
      console.error('Error creating question:', error);
      // You can also show an error message if creation fails
      message.error('Failed to create question');
    }
  };

  return (
    <>
  <Navbar />
  <Layout style={styles.layout}>
    <Card title={<Title level={4}>Add a Question</Title>} style={styles.formCard}>
      <Form
        form={form}
        
        layout="horizontal"
        onFinish={onSubmit}
      >
        <Form.Item name="text" label="Question" rules={[{ required: true, message: 'Please enter a question' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div style={styles.formList}> {/* Fixed typo in 'style' */}
          <h3>Follow this order to add answers: Always, Usually, Sometimes, Rarely, Never</h3>
          <h3>Value should be between 1 and 5</h3>
          <Form.List name="answers" style={styles.formList}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      label="Answer"
                      rules={[{ required: true, message: 'Please enter an answer' }]}
                    >
                      <Select placeholder="Select an option" style={{margin:'0px 20px'}}>
                        <Select.Option value="Always">Always</Select.Option>
                        <Select.Option value="Usually">Usually</Select.Option>
                        <Select.Option value="Sometimes">Sometimes</Select.Option>
                        <Select.Option value="Rarely">Rarely</Select.Option>
                        <Select.Option value="Never">Never</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'score']}
                      label="Score"
                      rules={[{ required: true, message: 'Please enter a score' }]}
                     
                    >
                      <InputNumber min={1} max={5} style={{margin:'0px 20px'}}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item >
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={styles.formList}>
                    Add Answer
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button type="primary" htmlType="submit" style={{ fontSize: '20px', padding: '0 30px' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </Layout>
  <Footer style={styles.footer}>
                <span>©2024 MindWell</span>
            </Footer>
</>

  );
}
  


export default QuestionPage;
