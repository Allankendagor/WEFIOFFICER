import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { UserContext } from "@/context/UserContext";
import  {useEffect, useState,useContext } from 'react';
import { Table } from "antd";



const FarmDetail: React.FC = () => {
    const intl = useIntl();
    const { token } = useContext(UserContext);
    const [leads, setLeads] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
  
    const getLeads = async () => {
      const localStorageToken = localStorage.getItem('awesomeleadstoken');
      if (!localStorageToken) {
        setErrorMessage("No token found in local storage.");
        return;
      }
  
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      };
  
      try {
        const response = await fetch("http://52.206.183.121:8000/fieldofficer/view/farmers", requestOptions);
        if (!response.ok) {
          throw new Error("Something went wrong! You do not have Administrator priviledges");
        }
        const data = await response.json();
        setLeads(data);
        setLoaded(true);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      }
    };
  
    useEffect(() => {
      getLeads();
    }, [token]);
    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
      };
  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by Kendas',
      })}
    >
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {loaded && leads ? (
          <Table
            dataSource={leads}
            columns={[
              {
                title: 'National ID',
                dataIndex: 'national_id',
                key: 'national_id',
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Phone Number',
                dataIndex: 'phone_number',
                key: 'phone_number',
              },
              {
                title: 'County',
                dataIndex: 'county',
                key: 'county',
              },
              {
                title: 'constituency',
                dataIndex: 'constituency',
                key: 'constituency',
              },
              {
                title: 'Ward',
                dataIndex: 'ward',
                key: 'ward',
              }
              ,
              {
                title: 'Gender',
                dataIndex: 'Gender',
                key: 'Gender',
              }
              ,
              {
                title: 'Nearest School',
                dataIndex: 'nearest_school',
                key: 'nearest_school',
              }
              
              
              
              // Add more columns as needed
            ]}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: handleTableChange,
              total: leads.length, // Assuming you get the total number of items from the server
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        This is me adding a page? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </PageContainer>
  );
};

export default FarmDetail;