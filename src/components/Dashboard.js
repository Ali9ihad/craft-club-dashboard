// In Dashboard.js
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  UserOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // Imported for navigation
import Memberslist from './Memberslist';
import Home from './Home';
import Teams1 from './Teams';
import Tasks1 from './Tasks';
import Status from './Status';

const { Header, Content, Footer, Sider } = Layout;

const Members = () => <Memberslist />;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/Home">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CheckSquareOutlined />}>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/teams">Teams</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/members">Members</Link>
              </Menu.Item>
            <Menu.Item key="5" icon={< FileOutlined/>}>
              <Link to="/Status">Status</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>


            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/tasks" element={<Tasks1 />} />
                <Route path="/teams" element={<Teams1 />} />
                <Route path="/members" element={<Members />} />
                <Route path="/Status" element={<Status />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Craft Club Dashboard ©2024 Created by <a href="https://www.linkedin.com/in/ali-9ihad/">Ali N. Abdulameer</a></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
