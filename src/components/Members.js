// Members.js

import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal, Form, Input } from 'antd';
import { database } from '../firebase'; // Adjust path if necessary

const Members = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Function to fetch data from Firebase and update local state
    const fetchData = async () => {
      try {
        const snapshot = await database.ref('accounts').get();
        if (snapshot.exists()) {
          const members = snapshot.val();
          const membersList = Object.keys(members).map(key => ({
            ...members[key],
            key: key,
            tags: members[key].tags || [],
          }));
          setData(membersList);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        const newData = {
          ...values,
          key: Date.now().toString(), // Unique key using timestamp
          tags: values.tags.split(',').map(tag => tag.trim()),
        };
        setIsModalVisible(false);
        form.resetFields();

        // Save new data to Firebase
        database.ref(`accounts/${newData.key}`).set(newData)
          .then(() => {
            console.log('Data saved successfully to Firebase');
            // Update local state with new data
            setData([...data, newData]);
          })
          .catch((error) => {
            console.error('Error saving data to Firebase:', error);
          });
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const handleDelete = (key) => {
    // Remove data from Firebase and update local state
    database.ref(`accounts/${key}`).remove()
      .then(() => {
        console.log('Data deleted successfully');
        const updatedData = data.filter(item => item.key !== key);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const onEdit = (record) => {
    // Implement edit functionality if needed
    console.log('Editing member:', record);
    // Add your edit logic here
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Busy') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>Edit</a> {/* Fix the onEdit handler */}
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Members</h1>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
        Add Member
      </Button>
      <Modal
        title="Add Member"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter member name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter member age' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="skills"
            label="Skills"
            rules={[{ required: true, message: 'Please enter member skills' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: 'Please enter member tags' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Members;
