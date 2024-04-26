import React,{useState, useEffect} from 'react';
import { Layout, Typography, Menu, Button, Avatar } from "antd";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './styles.js';
import { useDispatch } from 'react-redux';
import {LOGOUT} from '../../constants/actionType.js'

const { Title } = Typography;
const { Header } = Layout;


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user,setUser]= useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(()=>{
    const token =user?.token;
    if(token){

    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  },[location])

  const logout = ()=>{
    dispatch({type:LOGOUT})
    navigate("/")
    setUser(null)
  }
  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
      <Link to="/"> 
          <Title level={1} style={{ ...styles.title, color: "#fff" }}>MindWell</Title>
        </Link>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} style={styles.menu}>
          {/* <Menu.Item key="1" style={{color:'#fff'}}>
            <Link to="/admin/category">Category</Link>
          </Menu.Item> */}
          <Menu.Item key="2" style={{color:'#fff'}}>
            <Link to="/admin/question">QuestionForm</Link>
          </Menu.Item>
          <Menu.Item key="3" style={{color:'#fff'}}>
            <Link to="/admin/questionlist">QuestionList</Link>
          </Menu.Item>
          
        </Menu>
        {!user ?(
            <Link to="/admin">
            <Button htmlType='button' style={styles.login}>
                Log In
            </Button>
        </Link>
          ):(
            <div style={styles.userInfo}>
              <Avatar style={styles.avatar} alt='username' size="large">
              {user?.result?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              
              <Title style={styles.title}>{user?.result?.username}</Title>
              <Button onClick={logout} type="text" htmlType='button'>
      Log Out
    </Button>
            </div>
            
          )}
      </Header>
    </Layout>
  );
}

export default Navbar;
