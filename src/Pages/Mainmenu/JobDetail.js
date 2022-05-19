import { Table, Input, Tag, Card, Steps, Space, Typography, Layout, Menu, MenuProps } from 'antd';
import React, { Component } from 'react';
import globalUser from "../../GlobalVariable";

const { Step } = Steps;
const { TextArea } = Input;
const { Text, Link } = Typography;

class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            current: 0,
        };
    }

    componentDidMount = async () => {
        await fetch("https://localhost:5001/api/main/workitem/"+ window.location.pathname.replace("/main/status/", ""),{
            "method": "GET",
            "headers": new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "userId": this.props.cookies.userId
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
        console.log(this.state.items);
        return (
            <Card>
            </Card>
        );
    }
}

export default JobDetail;