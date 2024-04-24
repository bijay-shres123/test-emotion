import React from "react";
import {Layout, Image, Typography} from "antd"
import Logo from "./images/logo.png"
import Home from './components/Home/index.js'
import styles from './styles.js'


const {Title} =  Typography;
const {Header,Footer}= Layout;
const HomePage= ()=>{
    return(
   
        <Layout style = {styles.layout}>
            <Header style={styles.header}>
                <Image style={styles.image} width="45" preview="false" src={Logo}/>
                &nbsp;
                <Title style={styles.title}>Test</Title>
            </Header>
            <Home />
            <Footer style={styles.footer}>
                <span>Test@2024</span>
            </Footer>
        </Layout>
    )
}
export default HomePage;