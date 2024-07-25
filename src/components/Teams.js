// src/components/Teams.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox } from 'antd';
import { getTeams, addTeam, markTeamAsFinished, deleteTeam, getMembers } from '../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTeams();
    loadMembers();
  }, []);

  const loadTeams = async () => {
    const response = await getTeams();
    setTeams(response.data);
  };

  const loadMembers = async () => {
    const response = await getMembers();
    setMembers(response.data);
  };

  const handleAddTeam = async (values) => {
    await addTeam({ ...values, memberIds: values.members });
    loadTeams();
    setIsModalVisible(false);
  };

  const handleFinishTeam = async (id) => {
    await markTeamAsFinished(id);
    loadTeams();
  };

  const handleDeleteTeam = async (id) => {
    await deleteTeam(id);
    loadTeams();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleFinishTeam(record.id)} style={{ marginRight: 8 }}>
            Mark as Finished
          </Button>
          <Button onClick={() => handleDeleteTeam(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Team
      </Button>
      <Table columns={columns} dataSource={teams} rowKey="id" />
      <Modal
        title="Add Team"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddTeam(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="members" label="Members" rules={[{ required: true }]}>
            <Checkbox.Group>
              {members.map(member => (
                <Checkbox key={member.id} value={member.id}>
                  {member.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Teams;
