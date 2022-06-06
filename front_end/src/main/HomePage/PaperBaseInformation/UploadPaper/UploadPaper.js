import {Button, Form, Input, InputNumber, message, Upload} from "antd";
import axios from "axios";
import ApiUtil from "../../../../Utils/ApiUtil";
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    action: ApiUtil.API_PAPER_ADD_BASE_FILE,
    headers: {
        authorization: 'authorization-text',
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


const UploadPaper = () =>{
    const onFinish = (values) =>{
        console.log(values);
        console.log(ApiUtil.API_PAPER_ADD_BASE)
        axios.post(ApiUtil.API_PAPER_ADD_BASE,{
            username:localStorage.getItem("global_username"),
            doi:values.doi,
            name:values.name,
            time:values.time,
            first_author:values.first_author,
            second_author:values.second_author,
            third_author:values.third_author,
            corresponding_author:values.corresponding_author,
            provenance:values.provenance,
            type:values.type
        })
            .then(res=>{
                let {data} = res;
                console.log(data)
                message.success(data.msg)
            })
    };
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
            <Form.Item
                name='doi'
                label="doi"
                rules={[
                    {
                        required: true,
                        message:"请输入文章doi"
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='name'
                label="文章名称"
                rules={[
                    {
                        required: true,
                        message:"请输入文章名称"
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='time'
                label="发表时间"
                rules={[
                    {
                        required: true,
                        message:"请输入文章发表时间"
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='first_author'
                label="第一作者"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='second_author'
                label="第二作者"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='third_author'
                label="第三作者"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='corresponding_author'
                label="通信作者"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='provenance'
                label="出处"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='type'
                label="类型"
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>


            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default UploadPaper;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};