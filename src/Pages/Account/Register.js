import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd';

const { Link } = Typography;

class Register extends Component {

    onHandleSubmit = (values) => {
        if (values.password != values.verifyPassword) {
            message.warning('These two passwords are not equal.');
        } else {
            var contract = {
                mailAddress: values.mail,
                password: values.password
            }
            fetch("https://localhost:5001/api/account/register", {
                "method": "POST",
                "headers": new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
                "body": JSON.stringify(contract)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result.items
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    render() {
        return (
            <Row>
                <Col span={8} style={{ margin: "auto" }}>
                    <Card style={{ marginTop: 300, boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            onFinish={this.onHandleSubmit}
                        >
                            <Form.Item
                                label="Email"
                                name="mail"
                                rules={[{ required: true, message: 'Please input your mail address!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Verify Password"
                                name="verifyPassword"
                                rules={[{ required: true, message: 'Please verify your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Link href="/">
                                    Login
                                </Link>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row >
        );
    }
}

export default Register;