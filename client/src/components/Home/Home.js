import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import QuestionList from "../QuestionList"
import {Layout} from "antd"
import styles from './styles.js'
import {getQuestions} from '../../actions/questions.js'

const {Sider,Content} = Layout;
const Home = () =>{
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getQuestions());
    },[dispatch])
    return(
        <Layout style = {styles.layout}>
            
            <Content style = {styles.content}>
                <QuestionList/>
            </Content>
        </Layout>
    )
}

export default Home