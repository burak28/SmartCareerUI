import { Table, Input, Tag, Card, Steps, Space, Typography, Layout, Menu, MenuProps } from 'antd';
import React, { Component } from 'react';
import globalUser from "../../GlobalVariable";
import moment from 'moment';

const { Step } = Steps;
const { TextArea } = Input;
const { Text, Link } = Typography;

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      current: 0,
      items: null
    };
  }

  componentDidMount = async () => {
    await fetch("https://localhost:5001/api/main/workitem", {
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
          if (result?.status != 400) {
            this.setState({
              isLoaded: true,
              items: result,
            });
          }
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
    const columns = [
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        width: 450,
        render: text => <div style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: 450 }} >{text}</div>,
      },
      {
        title: 'Skill Set Count',
        dataIndex: 'skillSet',
        key: 'skillSet',
        render: text => <span>{text.length}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => this.props.navigate("/main/status/" + record.id)} >Detail</a>
          </Space>
        ),
      },
    ];
    return (
      <Card>
        <Table columns={columns} dataSource={this.state.items} />
      </Card>
    );
  }
}

export default Status;