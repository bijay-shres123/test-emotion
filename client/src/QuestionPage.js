// Question
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.js'
import {Card, Form, Input, Typography, Button} from "antd";
import { useDispatch } from 'react-redux';
import { createQuestion } from './actions/questions.js';
import { Select, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const {Title} = Typography


function QuestionPage(selectedId) {
    const [categories, setCategories] = useState([]);
    const question = useSelector((state)=> selectedId ? state.questions.find(question => question._id === selectedId ):null)

  useEffect(() => {
    // Fetch categories data from your backend API
    fetch('http://localhost:5001/categories')
      .then(response => response.json())
      .then(data => {
        // Set the fetched categories data to the state
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
    }, []); // Run this effect only once on component mount


  const dispatch = useDispatch();
  const [form] =  Form.useForm();
  const onSubmit = (formValues) =>{
    dispatch(createQuestion(formValues))
  }

  useEffect(()=>{
    if(question){
        form.setFieldValue(question)
    }
  },[])
  return (
    <Card
      style = {styles.formCard}
      title = {
        <Title level ={4} style={styles.formTitle}>
          Add Question
        </Title>
      }
    >
      <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout='horizontal'
            size='middle'
            onFinish={onSubmit}
            >
            <Form.Item name="text" label="Question" rules={[{ required: true }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                {/* You can use a Select component or any other appropriate component for selecting the category */}
                <Select>
                    {categories.map(category => (
                        <Select.Option key={category._id} value={category._id}>
                        {category.name}
                        </Select.Option>
                    ))}
                </Select>
                <h3>Follow following order to add answers: Always, Usually, Sometimes, Rarely, Never</h3>
                <h3>Value should limit min:1 to max:5</h3>
            </Form.Item>
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
                            style={{ marginBottom: '8px' }} // Adjust the margin bottom as needed
                             >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'score']}
                            label="Score"
                            rules={[{ required: true }]}
                            style={{ marginBottom: '8px' }} // Adjust the margin bottom as needed
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
  )
}

export default QuestionPage;
