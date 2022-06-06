import axios from "axios";
import {Button, Form, Input} from "antd";
import ApiUtil from "../../../../../Utils/ApiUtil";


const PaperSurveyAnalyse = () =>{
    const onFinish = (values) =>{
        axios.post(ApiUtil.API_PAPER_ANALYSE_INFORMARION+localStorage.getItem("global_username"),{
            field:values.field
        })
            .then(res=>{
                console.log(res.data.data)
                localStorage.setItem("analyse_data",JSON.stringify(res.data.data))
            })
    };
    return (
        <div>
            <Form name="nest-messages" onFinish={onFinish}>
                <Form.Item
                    name = 'field'
                    label= 'field'
                    rules={[
                        {
                            required: true,
                            message:"请输入文章领域"
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default PaperSurveyAnalyse;