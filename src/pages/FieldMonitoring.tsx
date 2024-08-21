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

    const formattedValues = {
        ...values,
        expected_date_of_harvest: values.expected_date_of_harvest
          ? dayjs(values.expected_date_of_harvest).format('YYYY-MM-DD')
          : undefined,
          date_of_weeding: values.date_of_weeding ? dayjs(values.date_of_weeding).format('YYYY-MM-DD')
          : undefined,
          date_of_spraying: values.date_of_spraying
          ? dayjs(values.date_of_spraying).format('YYYY-MM-DD')
          : undefined,
          date_of_planting: values.date_of_planting
          ? dayjs(values.date_of_planting).format('YYYY-MM-DD')
          : undefined,
      };
      console.log(formattedValues);
 
    try {
      const token = localStorage.getItem('awesomeleadstoken');
      if (!token) {
        message.error('No token found, please login again');
        return;
      }
  
      const response = await fetch('http://52.206.183.121:8000/fieldofficer/fieldmonitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedValues),
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
      label="Date Of Planting"
      name="date_of_planting"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <DatePicker defaultValue={dayjs('2024/01/01', dateFormat)} format={dateFormat} />
    </Form.Item>

    <Form.Item
      label="% Germination "
      name="germination_percentage"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Intercropping"
      name="intercropping"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="InterCropping Details"
      name="intercrop_details"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Date Of weeding"
      name="date_of_weeding"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <DatePicker defaultValue={dayjs('2024/01/01', dateFormat)} format={dateFormat} />
    </Form.Item>
    

    <Form.Item
      label="Disease Incidence"
      name="disease_incidence"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Mentions />
    </Form.Item>
    <Form.Item
      label="Pest Incidence"
      name="pest_incidence"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Date Of spraying"
      name="date_of_spraying"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <DatePicker defaultValue={dayjs('2024/01/01', dateFormat)} format={dateFormat} />
    </Form.Item>
    <Form.Item
      label="Harvest Date"
      name="expected_date_of_harvest"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <DatePicker defaultValue={dayjs('2024/01/01', dateFormat)} format={dateFormat} />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    
  </Form>
);

export default App;