import { Form, Input, Button, Card, Steps, message, Typography, Layout, Menu, MenuProps } from 'antd';
import React, { Component } from 'react';
import globalUser from "../../GlobalVariable";

const { Step } = Steps;
const { TextArea } = Input;
const { Text, Link } = Typography;

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            current: 0,
        };
    }

    componentDidMount = async () => {
    }

    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };

    next = async () => {
        if (this.state.current == 0) {
            const hide = message.loading('Action in progress..', 0);
            var contract = {
                description: this.state.jobDescription
            }
            await fetch("http://localhost:4888/resumeparser", {
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
            setTimeout(hide, 0);
        }
        this.setState({ current: this.state.current + 1 });
    };

    onHandleDone = async () => {
        const hide = message.loading('Action in progress..', 0);
        var contract = {
            data: this.state.jobDescription,
            skillSet: this.state.items?.skills
        }
        await fetch("https://localhost:5001/api/main/workitem", {
            "method": "POST",
            "headers": new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "userId": this.props.cookies.userId
            }),
            "body": JSON.stringify(contract)
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
        this.props.navigate("/main/status");
        setTimeout(hide, 0);
    }

    render() {
        const steps = [
            {
                title: 'Create',
                content: <div>
                    <span style={{ marginTop: 24 }}>Please describe job required job skills.</span>
                    <TextArea style={{ width: "100%", marginTop: 24, marginBottom: 24 }} rows={4} onChange={(e) => this.setState({ jobDescription: e.target.value })} />
                </div>,
            },
            {
                title: 'Display',
                content: <div>
                    <div>
                        <Text>{this.state.jobDescription}</Text>
                    </div>
                    <div style={{ marginTop: 36, marginBottom: 24 }}>
                        <Text>{this.state.items?.skills?.join(' - ')}</Text>
                    </div>
                </div>,
            },
        ];
        return (
            <Card>
                <>
                    <Steps current={this.state.current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div style={{ marginTop: 24 }} className="steps-content">{steps[this.state.current].content}</div>
                    <div className="steps-action">
                        {this.state.current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {this.state.current === steps.length - 1 && (
                            <Button type="primary" onClick={() => this.onHandleDone()}>
                                Done
                            </Button>
                        )}
                        {this.state.current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </>
            </Card>
        );
    }
}

export default Create;