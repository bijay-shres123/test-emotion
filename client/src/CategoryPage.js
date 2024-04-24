// CategoryPage.js

import React from 'react'
import styles from './styles.js'
import {Card, Form, Input, Typography, Button} from "antd";
import { useDispatch } from 'react-redux';
import { createCategory } from './actions/categories.js';


const {Title} = Typography


function CategoryPage() {
  const dispatch = useDispatch();
  const [form] =  Form.useForm();
  const onSubmit = (formValues) =>{
    dispatch(createCategory(formValues))
  }
  return (
    <Card
      style = {styles.formCard}
      title = {
        <Title level ={4} style={styles.formTitle}>
          Add Category
        </Title>
      }
    >
      <Form
        form ={form}
        labelCol={{span:6}}
        wrapperCol={{span:16}}
        layout='horizontal'
        size='middle'
        onFinish={onSubmit}
      >
        <Form.Item name="name" label ="name" rules={[{required:true}]}>
          <Input allowClear/>
        </Form.Item>
        <Form.Item name="description" label ="description" rules={[{required:true}]}>
          <Input.TextArea allowClear autoSize={{minRows:2, maxRows:6}}/>
        </Form.Item>
        
        <Form.Item 
        wrapperCol={{
          span:16,
          offset:6
        }}/>
        <Button
        type='primary'
        block
        htmlType='submit'
        >
          Submit
        </Button>

      </Form>

    </Card>
  )
}

export default CategoryPage;
