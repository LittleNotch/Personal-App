import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
import { Form, Popover, Progress, Select, Row, Col } from 'antd';
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import { getCaptcha, register } from '../../actions/account';
import styles from './index.module.less';

const { Option } = Select;

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            Intensity: Strong
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            Intensity: Medium
        </div>
    ),
    poor: (
        <div className={styles.error}>
            Intensity: Weak
        </div>
    ),
}

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
}


const Register = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [prefix, setPrefix] = useState('86');
    const [popover, setPopover] = useState(false);
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        dispatch(register(values));
    }

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    }
    const checkConfirm = (_, value) => {
        const promise = Promise;
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('password not matching');
        }
        return promise.resolve();
    }
    const checkPassword = (_, value) => {
        const promise = Promise;
        if (!value) {
            setVisible(!!value);
            return promise.reject('Please input password');
        }
        if (!visible) {
            setVisible(!!value);
        }
        setPopover(!popover);
        if (value && form.getFieldValue('confirm')) {
            form.validateFields(['confirm']);
        }
        return promise.resolve();
    }

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();

        return value && value.length && (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    className={styles.progress}
                    status={passwordProgressMap[passwordStatus]}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        )
    }

    const handleClickCaptcha = () => {
        form.validateFields(['username', 'email', 'password'])
            .then(() => {
                dispatch(getCaptcha(form.getFieldsValue(['username', 'email', 'password'])))
            })
    }


    return (
        <div className={styles.registerContainer}>
            <div className={styles.register}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    <InputItem
                        name="username"
                        placeholder="Username"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input username!'
                            }
                        ]}
                    />
                    <InputItem
                        name="email"
                        placeholder="Email"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input email!'
                            },
                            {
                                type: 'email',
                                message: 'Please input correct email!'
                            },
                        ]}
                    />
                    <Popover
                        content={
                            visible && (
                                <div>
                                    {passwordStatusMap[getPasswordStatus()]}
                                    {renderPasswordProgress()}
                                    <div>
                                        please input 6 digits. Don't use easy to hack
                                </div>
                                </div>
                            )
                        }
                        overlayStyle={{ width: 240 }}
                        placement="right"
                        visible={visible}
                    >
                        <InputItem
                            name="password"
                            type="password"
                            placeholder="At Least 6 digits"
                            size="large"
                            rules={[
                                {
                                    validator: checkPassword,
                                }
                            ]}
                        />
                    </Popover>
                    <InputItem
                        name="confirm"
                        type="password"
                        placeholder="Confirm the Password"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm the password!'
                            },
                            {
                                validator: checkConfirm,
                            }
                        ]}
                    />
                    <Row>
                        <Col span={6}>
                            <Select
                                size="large"
                                value={prefix}
                                onChange={(value) => setPrefix(value)}
                                style={{ width: '100%' }}
                            >
                                <Option value="86"> +86</Option>
                                <Option value="87"> +87</Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <InputItem
                                name="mobile"
                                placeholder="Cell"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input cell number!'
                                    },
                                    {
                                        pattern: /^\d{11}/,
                                        message: 'cell format incorrect!'
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                    <InputItem
                        name="captcha"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input confirm number'
                            }
                        ]}
                        placeholder="confirm number"
                        onClick={handleClickCaptcha}
                    />
                    <Row justify="space-between"  align="middle"> 
                        <Col span={8}>
                            <SubmitButton>Sign Up</SubmitButton>
                        </Col>
                        <Col span={16}>
                            <Link className={styles.login} to="/login">
                                Use existing username
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
};

export default Register;