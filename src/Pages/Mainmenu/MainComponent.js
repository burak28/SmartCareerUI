import React, { Component } from 'react'
import { Form, Input, Button, Card, Steps, message, Upload, Tag, Layout, Menu, MenuProps } from 'antd';
import { Descriptions, Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import globalUser from "../../GlobalVariable";
import {
    HomeOutlined,
    CheckOutlined,
    UserOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { Router, Route, Outlet, Link } from 'react-router-dom';
import Register from '../../Pages/Account/Register.js';

const { Dragger } = Upload;

const { Header, Content, Footer, Sider } = Layout;


class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            current: 0,
        };
    }

    render() {
        const items = [
            { label: 'item 1', title: "Profile" },
            { label: 'item 2' },
        ];

        return (
            <Layout hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="logo" style={{ height: 64, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "x-large" }}>SmartCareer</div>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="mainMenu" icon={<HomeOutlined />}>
                            <Link to={"main"}>Main Menu</Link>
                        </Menu.Item>
                        <Menu.Item key="profile" icon={<UserOutlined />}>
                            <Link to={"profile"}>Profile</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="career" icon={<CheckOutlined />} title={"Career"}>
                            <Menu.Item key="find">
                                <Link to={"find"}>Find</Link>
                            </Menu.Item>
                            <Menu.Item key="status">
                                <Link to={"status"}>Status</Link>
                            </Menu.Item>
                            <Menu.Item key="create">
                                <Link to={"create"}>Create</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="trending" icon={<LineChartOutlined />}>
                            <Link to={"trending"}>Trending</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainComponent;