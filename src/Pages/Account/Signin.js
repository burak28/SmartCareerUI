import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import globalUser from '../../GlobalVariable';


const { Text, Link } = Typography;



class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            current: 0
        };
    }

    onHandleSubmit = async (values) => {
        console.log(values);
        var contract = {
            mailAddress: values.mail,
            password: values.password
        }
        await fetch("https://localhost:5001/api/account/login", {
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
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    this.props.setCookie('userId', result.id, { path: '/' });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        this.props.navigate("/registercomplete");
    }

    render() {
        console.log(globalUser);
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

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Link href="/signup">
                                    Create An Account
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

export default Signin;