import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';

const { Text, Link } = Typography;

class Register extends Component {

    onHandleSubmit = (values) => {
        console.log(values);
        var contract = {
            mailAddress:values.mail,
            password: values.password
        }
        fetch("https://localhost:7193/api/account/register", {
            "method": "POST",
            "headers": new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            "body":JSON.stringify(contract)
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

    render() {
        return (
            <Row>
                <Col span={6} style={{ margin: "auto" }}>
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
                                label="Mail"
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
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
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