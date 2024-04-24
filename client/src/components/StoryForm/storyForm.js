import React from 'react'
import styles from './styles.js'
import {Card, Form, Input, Typography, Button} from "antd";
import { UseDispatch, useDispatch } from 'react-redux';
import { createStory } from '../../actions/stories';

const {Title} = Typography
function StoryForm() {
  const dispatch = useDispatch();
  const [form] =  Form.useForm();
  const onSubmit = (formValues) =>{
    dispatch(createStory(formValues))
  }
  return (
    <Card
      style = {styles.formCard}
      title = {
        <Title level ={4} style={styles.formTitle}>

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
        <Form.Item name="username" label ="Username" rules={[{required:true}]}>
          <Input allowClear/>
        </Form.Item>
        <Form.Item name="caption" label ="caption" rules={[{required:true}]}>
          <Input.TextArea allowClear autoSize={{minRows:2, maxRows:6}}/>
        </Form.Item>
        <Form.Item name="tags" label ="tags">
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

export default StoryForm
