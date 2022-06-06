import {useState} from "@types/react";
import {useEffect} from "react";
import axios from "axios";
import ApiUtil from "../../../../Utils/ApiUtil";
import {Button, message, Modal, Table} from "antd";


const colums = [
    {
        title:"id",
        dataIndex:'id',
        key:'id',
    },
    {
        title:"name",
        dataIndex:'name',
        key:'name',
    },
    {
        title:"short_name",
        dataIndex:'short_name',
        key:'short_name',
    },
    {
        title:"level",
        dataIndex:'level',
        key:'level',
    },
]

const ConferenceTable = () =>{
    const [returnOrderModal, setreturnOrderModal] = useState(false);

    let [data,setData] = useState([]);

    useEffect(()=>{
        axios.post(ApiUtil.API_CONFERENCE_GET_ALL_INFORMATION,{

        })
            .then(res=>{
                let {data} = res;
                if(data.code ===0) {
                    message.success(data.msg)
                    console.log(data)
                    setData(data.data)
                }

            })
    },[])
    return (
        <div>
            <Table columns={colums} dataSource={data}/>
            <Button type="primary" onClick={()=>{
                setreturnOrderModal(true);
            }}>
                增添会议
            </Button>
            <Modal
                visible={returnOrderModal}
                closable={false}
                onCancel={()=>{
                    setreturnOrderModal(false);
                }}
                onOk={()=>{
                    setreturnOrderModal(false);
                }}
                cancelText="关闭1"
                okText="关闭2">

            </Modal>
        </div>
    )
};

export default ConferenceTable;