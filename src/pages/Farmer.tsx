import React from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  message,
  TreeSelect,
} from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "@/context/UserContext";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const onFinish = async (values: any) => {
 
    try {
      const token = localStorage.getItem('awesomeleadstoken');
      if (!token) {
        message.error('No token found, please login again');
        return;
      }
  
      const response = await fetch('http://52.206.183.121:8000/fieldofficer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        message.success('Form submitted successfully');
        // Uncomment if navigation is needed
         //navigate('/welcome');
   
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        message.error(errorData.message || 'Failed to submit the form');
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error('An error occurred while submitting the form');
    }
  };
  

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];


const App: React.FC = () => (
  
    <Form {...formItemLayout} onFinish={onFinish} style={{ maxWidth: 600 }}>
      
    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
      <Input />
    </Form.Item>

    <Form.Item
  label="National ID"
  name="national_id"
  rules={[
    { required: true, message: 'Please input your National ID!' },
    {
      validator: (_, value) => {
        if (!value || value.length === 8) { // Example: ID should be 8 characters
          return Promise.resolve();
        }
        return Promise.reject(new Error('National ID must be 8 characters long'));
      }
    }
  ]}
>
  <Input />
</Form.Item>

    <Form.Item
      label="Phone Number"
      name="phone_number"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="County"
      name="county"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Constituency"
      name="constituency"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Ward"
      name="ward"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item label="Gender" name="Gender">
      <Select options={genderOptions} />
    </Form.Item>

    <Form.Item
      label="Nearest School"
      name="nearest_school"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>
    <Form.Item
      label="Picture ID"
      name="id_picture"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    
  </Form>
);

export default App;