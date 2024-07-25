import React, { useState, useEffect } from 'react';
import { Avatar, List, Button, Modal, Form, Input, Select } from 'antd';
import { getMembers, addMember } from '../services/api';

const { Option } = Select;

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAddMember = async (values) => {
    try {
      await addMember(values);
      console.log('Submitting member:', values); 
      fetchMembers(); // Refresh member list
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(values => {
        handleAddMember(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Member
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={members}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`} />}
              title={item.name}
              description={`${item.expertise} - ${item.availability} - ${item.country}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Add New Member"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="add_member_form"
          initialValues={{ availability: 'free' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the member name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="expertise"
            label="Expertise"
            rules={[{ required: true, message: 'Please input the member expertise!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="availability"
            label="Availability"
            rules={[{ required: true, message: 'Please select the availability!' }]}
          >
            <Select>
              <Option value="free">Free</Option>
              <Option value="busy">Busy</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Please input the country!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MembersList;
