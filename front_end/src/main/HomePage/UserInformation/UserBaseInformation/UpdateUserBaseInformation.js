import {Link, useNavigate} from "react-router-dom";
import ApiUtil from "../../../../Utils/ApiUtil";
import axios from "axios";
import {Button, Checkbox, Form, Input, message} from "antd";
import {useEffect, useState} from "react";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */
//
// const validateMessages = {
//     required: '${label} is required!',
//     types: {
//         email: '${label} is not a valid email!',
//         number: '${label} is not a valid number!',
//     },
//     number: {
//         range: '${label} must be between ${min} and ${max}',
//     },
// };
/* eslint-enable no-template-curly-in-string */

const UpdateUserBaseInformation = () => {
    const history = useNavigate();
    let [data,setData] = useState([]);
    useEffect(()=>{
        axios.post(ApiUtil.API_USER_GET_USER+localStorage.getItem("global_username"),{

        })
            .then(res=>{
                let {data} =res;
                if(data.code === 0) {
                    message.success(data.msg)
                    console.log(data.data[0])
                    localStorage.setItem("data",data.data[0])
                    setData(data.data[0])
                }
            })
    },[])
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(ApiUtil.API_USER_UPDATE_USER_INFORMATION)
        axios.post(ApiUtil.API_USER_UPDATE_USER_INFORMATION,{
            username:localStorage.getItem("global_username"),
            new_username:values.username,
            password:values.password,
            sex:values.sex,
            telephone:values.telephone,
            address:values.address
        })
            .then(res=>{
                let {data} = res;
                console.log(data.data)
                if(data.code === 0) {
                    history('/');
                    localStorage.setItem("global_username",values.username)
                }
                message.success(data.msg)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('校验失败');
    };

    return (
        <div className="SignUp">
            <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    name='username'
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input defaultValue={localStorage.getItem("global_username")} />
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
                    name= 'sex'
                    label="性别"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your sex!',
                        },
                    ]}
                >
                    <Input value={localStorage.getItem("global_username").sex}/>
                </Form.Item>

                <Form.Item
                    name='telephone'
                    label="手机"
                    rules={[
                        {
                            required:true,
                            message:'Please input your telephone'
                        },
                    ]}
                >
                    <Input defaultValue={localStorage.getItem("global_username").telephone}/>
                </Form.Item>

                <Form.Item
                    name='address'
                    label="地址"
                    rules={[
                        {
                            required:true,
                            message: 'Please input your address !',
                        },
                    ]}
                >
                    <Input defaultValue={localStorage.getItem("global_username").address}/>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUserBaseInformation;