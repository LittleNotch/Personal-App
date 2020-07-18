import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Form, Checkbox, Row } from 'antd';
import { UserOutlined, LockTwoTone, MobileTwoTone, 
         MailTwoTone, AlipayCircleOutlined, TaobaoCircleOutlined,
         WeiboCircleOutlined } from '@ant-design/icons';
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import styles from './index.module.less';

const { TabPane } = Tabs;

const Login = () => {
    const [autoLogin, setAutoLogin] = useState(true);
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        console.log(values);
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Account Password Login" key="1">
                            <InputItem
                                name="username"
                                prefix={
                                    <UserOutlined style={{ color: '#1890ff' }} />
                                }
                                placeholder="UserName"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill in username!'
                                    }
                                ]}
                            />
                            <InputItem
                                name="password"
                                type="password"
                                prefix={
                                    <LockTwoTone />
                                }
                                placeholder="Password"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill in password!'
                                    }
                                ]}
                            />
                        </TabPane>
                        <TabPane tab="Cell Number Login" key="2">
                        <InputItem
                                name="mobile"
                                prefix={
                                    <MobileTwoTone />
                                }
                                placeholder="Cell Number"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill in cell number!'
                                    }
                                ]}
                            />
                            <InputItem
                                name="captcha"
                                prefix={
                                    <MailTwoTone />
                                }
                                placeholder="Confirm Number"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill in confirm number!'
                                    }
                                ]}
                            />
                        </TabPane>
                    </Tabs>
                    <Row justify="space-between">
                        <Checkbox 
                            checked={autoLogin}
                            onChange={(e) => setAutoLogin(e.target.checked)}
                        >
                            Atuo Login
                        </Checkbox>
                        <a href="#!">Foget Password</a>
                    </Row>
                    <SubmitButton>Login</SubmitButton>
                </Form>
                <div className={styles.other}>
                    Other Methods to login
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                    <Link className={styles.register} to="/register">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;