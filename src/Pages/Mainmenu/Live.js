import { Table, Input, Comment, Card, Steps, Form, Typography, Button, Tooltip, MenuProps, message } from 'antd';
import React, { Component } from 'react';
import globalUser from "../../GlobalVariable";
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useCookies } from 'react-cookie';

const { Step } = Steps;
const { TextArea } = Input;
const { Text, Link } = Typography;

class Live extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            current: 0,
        };
    }

    actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={this.like}>
                <span className="comment-action">{this.likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={this.dislike}>
                <span className="comment-action">{this.dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    componentDidMount = async () => {
        await this.getCommentItem();
    }

    getCommentItem = async () => {
        await fetch("https://localhost:5001/api/main/allcomments", {
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

    handleOnChange = (e) => {
        this.setState({ commentData: e.target.value });
    }

    onSubmit = async () => {
        var commentData = this.state.commentData;
        if (commentData == null) {
            message.warning("Comment can not be null.")
        }
        else {
            var contract = {
                data: commentData,
                commentId: "1"
            }
            await fetch("https://localhost:5001/api/main/comment", {
                "method": "POST",
                "headers": new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "userId": this.props.cookies.userId,
                }),
                "body": JSON.stringify(contract)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            data: result
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
        await this.getCommentItem();
        this.setState({ commentData: "" })
    }

    render() {
        console.log(this.state.items);
        return (
            <Card style={{ maxWidth: 1000, margin: "auto", textAlign: "start" }} >
                <Comment
                    content={
                        <>
                            <Form.Item>
                                <TextArea rows={4} value={this.state.commentData} onChange={this.handleOnChange} maxLength={144} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" onClick={() => this.onSubmit()} type="primary">
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </>
                    }
                />
                <Card>
                    {this.state.items?.map(item => <Comment
                        author={item.userEmail}
                        actions={this.actions}
                        content={
                            <p>
                                {item.data}
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(item.createdDate).fromNow()}</span>
                            </Tooltip>
                        }
                    />)}
                </Card>
            </Card>
        );
    }
}

export default Live;