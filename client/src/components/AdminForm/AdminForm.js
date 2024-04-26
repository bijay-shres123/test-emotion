import React,{useState} from 'react'
import Navbar from '../Layout/Navbar'
import { Form, Input, Button, Card, Typography, Layout } from "antd";
import styles from './style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../actions/authentication';
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const {Title} = Typography;

function AdminForm() {
    const user = null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit = (formValues) => {
        if (isLogin) {
            dispatch(login(formValues, navigate));
        } else {
            dispatch(signup(formValues, navigate));
        }
    };

    const switchMode = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    };
    return (
        <>
            <Navbar />
            <Layout style={styles.container}>
                <Card
                    style={styles.card}
                    title={
                        <Title level={4} style={styles.title}>
                            {isLogin ? "Login to" : "Join"} MindWell
                        </Title>
                    }
                >
                    <Form
                        name="authform"
                        form={form}
                        size="large"
                        wrapperCol={{ span: 20, offset: 2 }}
                        style={styles.form}
                        onFinish={onSubmit}
                    >
                        {isLogin || (
                            <>
                                <Form.Item
                                    name="username"
                            
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your username"
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="username" style={styles.input}/>
                                </Form.Item>
                            </>
                        )}
                        <Form.Item
                            name="email"
                            
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter valid email address"
                                }
                            ]}
                        >
                            <Input type="email" prefix={<MailOutlined />} placeholder="email address" style={styles.input}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password"
                                }
                            ]}
                        >
                            <Input.Password type="password" prefix={<LockOutlined />} placeholder="password" style={styles.input} />
                        </Form.Item>
                        {isLogin || (
                            <Form.Item
                                name="confirmPassword"
                               
                                rules={[
                                    {
                                        required: true,
                                        message: "Please repeat your password"
                                    }
                                ]}
                            >
                                <Input.Password type="password" prefix={<LockOutlined />} placeholder="Confirm Password" style={styles.input} />
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button htmlType='submit' typeof='primary'style={styles.submitButton}>
                                {isLogin ? "Log In" : "Join"}
                            </Button>
                            {/* <span style={{ margin: "0 10px 0px 20px" }}>Or</span>
                            <Button type='link' onClick={switchMode}>
                                {isLogin ? "Register now" : "have an account?"}
                            </Button> */}
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
            <Footer style={{ color: "white", textAlign: "center", background: "#7FB3D5", }}>
                <span>©2024 MindWell</span>
            </Footer>
            
        </>
    )
}

export default AdminForm
