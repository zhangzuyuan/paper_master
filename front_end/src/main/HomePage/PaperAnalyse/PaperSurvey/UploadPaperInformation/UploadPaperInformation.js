import axios from "axios";
import {Button, Form, Input, message} from "antd";
import ApiUtil from "../../../../../Utils/ApiUtil";


const UploadPaperInformation = () =>{
    const onFinish = (values) =>{
        console.log(values);
        axios.post(ApiUtil.API_ADD_PAPER_ANALYSE,{
            username:localStorage.getItem("global_username"),
            doi:values.doi,
            name:values.name,
            field:values.field,
            problem:values.problem,
            solution:values.solution
        })
            .then(res=>{
                let {data} = res;
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
                name='field'
                label="领域"
                rules={[
                    {
                        required: true,
                        message:"请输入文章领域"
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='problem'
                label="问题"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='solution'
                label="解决方法"
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default UploadPaperInformation;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};