import React, { Component } from 'react'
import { Form, Input, Button, Card, Steps, message, Upload, Tag, Layout } from 'antd';
import { Descriptions, Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import globalUser from "../../GlobalVariable";

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

const { Step } = Steps;



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      current: 0,
    };
  }

  next = async () => {
    if (this.state.current == 0) {
      const hide = message.loading('Action in progress..', 0);
      var contract = {
        description: this.state.profileDescription
      }
      await fetch("http://localhost:5000/resumeparser", {
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
        username: this.state.items?.personname,
        phoneNumber: this.state.items?.phone,
        skills: this.state.items?.skills
      }
      await fetch("https://localhost:7193/api/account/completeregister", {
        "method": "POST",
        "headers": new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "userId": globalUser?.id
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

  prev = () => {
    this.setState({ current: this.state.current - 1 });
  };

  onCloseHandleTag = (e) => {
    console.log(e.target);
  }

  onChangeForm = (changedValues, allValues) => {
    var items = {
      ...this.state.items
    }
    items.phone = allValues.phone;
    items.username = allValues.username;
    console.log(items);
    this.setState({ items })
  }

  render() {
    console.log(this.state.items);
    const steps = [
      {
        title: 'Create',
        content: <>
          <span style={{ marginTop: 24 }}>Who are you ? Please describe yourself (Name, Email, Phone, Skills) (You can be upload a pdf file)</span>
          <TextArea style={{ width: "100%", marginTop: 24, marginBottom: 24 }} rows={4} onChange={(e) => this.setState({ profileDescription: e.target.value })} />
          <Dragger style={{ marginBottom: 24 }} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger>
        </>,
      },
      {
        title: 'Validate',
        content: <Form
          onValuesChange={this.onChangeForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input defaultValue={this.state.items?.personname} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
          >
            <Input defaultValue={this.state.items?.phone} />
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
          >
            <>
              {this.state.items?.skills?.map(item => {
                return (<Tag onClose={(e) => this.onCloseHandleTag(e)}>
                  {item}
                </Tag>);
              })}
            </>
          </Form.Item>
        </Form>,
      },
      {
        title: 'Display',
        content: <Descriptions title="User Info" bordered>
          <Descriptions.Item label="Username" span={3}>{this.state.items?.personname}</Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>{this.state.items?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number" span={3}>{this.state.items?.phone}</Descriptions.Item>
          <Descriptions.Item label="Skills" span={3}>{this.state.items?.skills?.map(item => { return (item + " - ") })}</Descriptions.Item>
        </Descriptions>,
      },
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
          <div className="logo" />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
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
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Main;