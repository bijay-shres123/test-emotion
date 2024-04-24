import React from 'react';
import { Layout, Typography, Menu } from "antd";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './styles.js';

const { Title } = Typography;
const { Header } = Layout;

function Navbar() {
  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
      <Link to="/"> 
          <Title level={1} style={{ ...styles.title, color: "#fff" }}>MindWell</Title>
        </Link>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} style={styles.menu}>
          <Menu.Item key="1" style={{color:'#fff'}}>
            <Link to="/admin/category">Category</Link>
          </Menu.Item>
          <Menu.Item key="2" style={{color:'#fff'}}>
            <Link to="/admin/question">QuestionForm</Link>
          </Menu.Item>
          <Menu.Item key="3" style={{color:'#fff'}}>
            <Link to="/admin/questionlist">QuestionList</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default Navbar;
