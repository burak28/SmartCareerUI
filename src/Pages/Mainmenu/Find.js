import React, { Component } from 'react'
import { Form, Input, Button, Card, Steps, message, Upload, Tag, Layout, Menu, MenuProps, Typography } from 'antd';
import { Row, Col, Slider } from 'antd';
import { Avatar } from 'antd';
import { Descriptions, Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import globalUser from "../../GlobalVariable";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Router, Route } from 'react-router-dom';
import Register from '../../Pages/Account/Register.js';

const { Dragger } = Upload;

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;


class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }

    componentDidMount = async () => {
    }

    onClickHandle = async () => {
        console.log("aaa");
        const hide = message.loading('Action in progress..', 0);
        var contract = {
            id: this.props.cookies.userId
        }
        await fetch("http://localhost:4888/bestjob", {
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
                        items: result,
                        disabled: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        setTimeout(hide, 0);
    }

    render() {
        return (
            <Card>
                <Button disabled={this.state.disabled} onClick={() => this.onClickHandle()} type="primary">Find Job</Button>
                <Row style={{ marginTop: 48 }} gutter={[16, 16]} >
                    {this.state.items?.map(item => <Col span={8}>
                        <Card>
                            <div>
                                <Text>{item.data}</Text>
                            </div>
                            <div style={{ marginTop: 16 }} >
                                <Text>{item.skillSet.join(" - ")}</Text>
                            </div>
                        </Card>
                    </Col>)}
                </Row>
            </Card>
        );
    }
}

export default Find;