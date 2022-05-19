import React, { Component } from 'react'
import { Form, Input, Button, Card, Steps, message, Upload, Tag, Layout, Menu, MenuProps } from 'antd';
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

const { Header, Content, Footer, Sider } = Layout;


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
        await fetch("https://localhost:5001/api/account/profile/" + this.props.cookies.userId, {
        "method": "GET",
        "headers": new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":  "http://localhost:4888"
        })
      })

        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
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
            <Card>
                <Row gutter={[40, 16]}>
                    <Col span={24} >
                        <Avatar
                            shape="square"
                            size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 64,
                                xl: 80,
                                xxl: 100,
                            }}
                            icon={<UserOutlined />}
                        />
                    </Col>
                </Row>
                <Row style={{ justifyContent: "center" }} >
                    <Descriptions title="User Info" bordered>
                        <Descriptions.Item label="Username" span={3}>{this.state.items?.username}</Descriptions.Item>
                        <Descriptions.Item label="Email" span={3}>{this.state.items?.mailAddress}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number" span={3}>{this.state.items?.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Skills" span={3}>{this.state.items?.skills?.join("-")}</Descriptions.Item>
                    </Descriptions>
                </Row>
            </Card>
        );
    }
}

export default Profile;