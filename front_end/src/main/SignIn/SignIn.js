import {Form, Input, Button, Checkbox, message, Avatar} from 'antd';
import axios from "axios";
import "./SignIn.css"
import {Link, useNavigate} from 'react-router-dom';
import ApiUtil from "../../Utils/ApiUtil";
import HomePage from "../HomePage/HomePage";
import TableAll from "../HomePage/PaperBaseInformation/TableAll/TableAll";
import {useState} from "react";
import {UserOutlined} from "@ant-design/icons";


const SignIn = () => {
    let [picture,setPicture] = useState()
    const history = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(ApiUtil.API_USER_SIGN_IN)
        axios.post(ApiUtil.API_USER_SIGN_IN,{
            password:values.password,
            username:values.username
        })
            .then(res=>{
                let {data} = res;
                console.log(data)
                if(data.code === 0) {
                    //message.success(data.msg)
                    //TableAll.setState(global_user_name)
                    //console.log(global_user_name)
                    console.log(data.sign_in_info.username)
                    localStorage.setItem("global_username",data.sign_in_info.username)
                    console.log(localStorage)
                    //sessionStorage.token = data.token;
                    history('/HomePage');
                }
                message.success(data.msg)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('校验失败');
    };
    const usernameChange = (event) =>{
        setPicture(ApiUtil.API_USER_GET_USER_PICTURE + event.target.value)
        console.log(ApiUtil.API_USER_GET_USER_PICTURE + event.target.value)
    };


    return (
        <div className="SingIn">
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item className="picture">
                <Avatar size={128} icon={<UserOutlined />} src={picture}/>
            </Form.Item>
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input onChange={usernameChange} />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Link to="/SignUp" style={{ color: '#8C8D9B' }}>创建账号</Link>

            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default SignIn;