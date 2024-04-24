import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Form, Input, Typography, Button, Select, Space, InputNumber, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateQuestion, getQuestions } from './actions/questions.js';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'; // Import useParams hook


const { Title } = Typography;

function EditQuestionPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]); // Make sure to include 'dispatch' in the dependency array if it's used inside the effect

  const [categories, setCategories] = useState([]);
  const new_question_array = ( useSelector((state) =>state.questions.questions))
  console.log(new_question_array)



  const question = useSelector((state) => {
    if (id && Array.isArray(new_question_array)) {
      return new_question_array.find((que) => que._id === id) || null;
    } else {
      return null;
    }
  });
  
  
  
  
 
  useEffect(() => {
    if (question) {
      // Set field values for the text and category fields
      form.setFieldsValue({
        text: question.text,
        category: question.category,
      });
    }
  }, [question]); // Include 'question' in the dependency array

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

  const [form] = Form.useForm();

  const onSubmit = (formValues) => {
    // Dispatch the updateQuestion action
    dispatch(updateQuestion(id, formValues))
      .then(() => {
        // Display a success message
        message.success('Question updated successfully');
        // Navigate back to the previous screen
      
      })
      .catch((error) => {
        console.error('Error updating question:', error);
        message.error('Failed to update question');
      });
  };
  
  return (
    <Card
      title={<Title level={4}>Edit Question</Title>}
    >
        
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
        initialValues={{ text: '', category: '', answers: [] }}
      >
        <Form.Item name="text" label="Question" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <h3>
            Follow following order to add answers: Always, Usually, Sometimes,
            Rarely, Never
          </h3>
          <h3>Value should limit min:1 to max:5</h3>
        <Form.List name="answers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                 <Form.Item
                    {...restField}
                    name={[name, 'text']}
                    label="Answer Text"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '8px' }}
                  >
                    <Select placeholder="Select an option">
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
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} max={5} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Answer
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EditQuestionPage;
