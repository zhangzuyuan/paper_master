import {Avatar, Badge, Descriptions, message} from 'antd';
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import ApiUtil from "../../../../Utils/ApiUtil";
import {UserOutlined} from "@ant-design/icons";

const UserBaseInformation = () => {

    let [data, setData] = useState([]);
    useEffect(()=>{
        axios.post(ApiUtil.API_USER_GET_USER+localStorage.getItem("global_username"),{

        })
            .then(res=>{
                let {data} = res;
                if(data.code === 0){
                    message.success(data.msg)
                    console.log(data.data[0])
                    setData(data.data[0])
                }
            })

    },[])

    return (
        <div>
            <Avatar size={64} icon={<UserOutlined />} src={ApiUtil.API_USER_GET_USER_PICTURE + localStorage.getItem("global_username")} />
        <Descriptions title="用户信息" bordered>
            <Descriptions.Item label="用户名">{data.username}</Descriptions.Item>
            <Descriptions.Item label="性别">{data.sex}</Descriptions.Item>
            <Descriptions.Item label="手机">{data.telephone}</Descriptions.Item>
            <Descriptions.Item label="地址">{data.address}</Descriptions.Item>
            <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running"/>
            </Descriptions.Item>
            <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
            <Descriptions.Item label="Config Info">
                Data disk type: MongoDB
                <br/>
                Database version: 3.4
                <br/>
                Package: dds.mongo.mid
                <br/>
                Storage space: 10 GB
                <br/>
                Replication factor: 3
                <br/>
                Region: East China 1<br/>
            </Descriptions.Item>
        </Descriptions>
        </div>
    );
};

export default UserBaseInformation;