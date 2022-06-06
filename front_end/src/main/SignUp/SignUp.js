import {Form, Input, InputNumber, Button, message, Upload} from 'antd';
import './SignUp.css'
import ApiUtil from "../../Utils/ApiUtil";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
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

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const history = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(ApiUtil.API_USER_SIGN_UP)
        axios.post(ApiUtil.API_USER_SIGN_UP,{
            username:values.username,
            password:values.password,
            sex:values.sex,
            telephone:values.telephone,
            address:values.address
        })
            .then(res=>{
                let {data} = res;
                console.log(data)
                if(data.code === 0) {
                    history('/');
                }
                message.success(data.msg)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('校验失败');
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

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
                    <Input />
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
                    <Input />
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
                    <Input />
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
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={ApiUtil.API_USER_SIGN_UP_PICTURE}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
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

export default SignUp;