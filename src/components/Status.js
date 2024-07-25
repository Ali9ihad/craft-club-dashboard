// src/components/Status.js
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getStatus } from '../services/api';

const Status = () => {
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const response = await getStatus();
    setStatusList(response.data);
  };

  const columns = [
    { title: 'Task Name', dataIndex: 'task_name', key: 'task_name' },
    { title: 'Feedback', dataIndex: 'feedback', key: 'feedback' },
  ];

  return <Table columns={columns} dataSource={statusList} rowKey="id" />;
};

export default Status;
