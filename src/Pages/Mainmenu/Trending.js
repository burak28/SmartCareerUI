import { Card, Typography, Col, Row, message } from 'antd';
import React, { Component } from 'react';
import globalUser from "../../GlobalVariable";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const { Title } = Typography;

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            current: 0,
        };
    }

    componentDidMount = async () => {
        const hide = message.loading('Action in progress..', 0);
        await fetch("https://localhost:5001/api/main/graphicdata/"+this.props.cookies.userId, {
            "method": "GET",
            "headers": new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    if ( result != null ){
                        var max = JSON.parse(this.state.items[0]);
                        var min = JSON.parse(this.state.items[1]);
                        max.forEach(element => {
                            var a = Object.keys(element).find(key => {if (element[key] === 8) element[key] = "Software" });
                        });
                        max.forEach(element => {
                            var a = Object.keys(element).find(key => {
                                if (element[key] === -1){
                                    element[key] = key;
                                    key = "name";
                                }
                                 });
                        });
                        min.forEach(element => {
                            var a = Object.keys(element).find(key => {if (element[key] === -1) element[key] = "name" });
                        });
                        //var a = Object.keys(max[0]).find(key => {if (max[0][key] === -1) max[0][key] = "name" });
                        this.setState({
                            max,
                            min
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
        setTimeout(hide, 0);
    }

    render() {
        console.log(this.state.max);
        console.log(this.state.min);
        const data = [
            {
              '2022-4': "name",
              smartcareer: 4000,
            },
            {
              name: 'Page B',
              a: 3000,
            },
            {
              name: 'Page C',
              b: 2000,
            },
            {
              name: 'Page D',
              b: 2780,
            },
            {
              name: 'Page E',
              a: 1890,
            },
            {
              name: 'Page F',
              a: 2390,
            },
            {
              name: 'Page G',
              uv: 3490,
            },
          ];
          console.log(data);
        return (
            <Card>
                <Title style={{ textAlign: "start" }} level={3}>Rising 3 Skills</Title>
                <Row gutter={[16, 16]}>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={this.state?.max} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="green" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="green" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="green" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                </Row>
                <Title style={{ textAlign: "start" }} level={3}>Decrasing 3 Skills</Title>
                <Row gutter={[16, 16]}>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="red" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="red" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                    <Col span={8} >
                        <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="red" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Trending;