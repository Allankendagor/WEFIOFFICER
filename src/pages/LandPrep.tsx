import React from 'react';
import {
  Button,
  Cascader,
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
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const customFormat: DatePickerProps['format'] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

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
  
      const response = await fetch('http://52.206.183.121:8000/fieldofficer/landprep', {
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
      
    <Form.Item label="Farmer ID" name="farmer_id" rules={[{ required: true, message: 'Please input!' }]}>
      <Input />
    </Form.Item>


    <Form.Item
      label="Farm Size"
      name="farm_size"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Area Ploughed"
      name="area_ploughed"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Seed Distribution."
      name="seed_distribution"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>



    <Form.Item
      label="Soil Type"
      name="soil_type"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>
   
    <Form.Item
      label="GIS data"
      name="gis"
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