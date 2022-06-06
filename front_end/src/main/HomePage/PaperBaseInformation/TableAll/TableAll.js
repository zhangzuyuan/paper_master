import {Table, Tag, Space, message, Button, Modal} from 'antd';
import {useState,useEffect} from "react";
import axios from "axios";
import ApiUtil from "../../../../Utils/ApiUtil";
//import SignIn, {global_user_name} from "../../SignIn/SignIn";
import UploadPaper from "../UploadPaper/UploadPaper";
import React from "react";


const columns = [
    {
        title: 'DOI',
        dataIndex: 'doi',
        key: 'doi',
        render: text => <a>{text}</a>,
    },
    {
        title: '文章名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '第一作者',
        dataIndex: 'first_author',
        key: 'first_author',
    },
    {
        title: '第二作者',
        dataIndex: 'second_author',
        key: 'second_author',
    },
    {
        title: '第三作者',
        dataIndex: 'third_author',
        key: 'third_author',
    },
    {
        title: '通讯作者',
        dataIndex: 'corresponding_author',
        key: 'corresponding_author',
    },
    {
        title: "浏览",
        key:"show",
        render: (_, record) => (
            <Space size="middle">
                <a href={ApiUtil.API_PAPER_SHOW + record.doi}>浏览</a>
            </Space>
        ),
    }
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <>
    //             {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: '种类',
    //     key: 'type',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

// // let data = [];
// axios.get('https://lianghj.top:8888/api/private/v1/user',{
//     params:{
//         pagesize:10,
//         pagenum:1
//     },
//     headers:{
//         Authorization:sessionStorage.token
//     }
// })
//     .then(res=>{
//         let {data:{users}}= res.data;
//         console.log(users)
//     })

// eslint-disable-next-line import/no-anonymous-default-export
const TableAll = () => {
    const [returnOrderModal, setreturnOrderModal] = useState(false);
    //使用函数式使用useStete来定义数据[]是初始值，setData是在给data赋值时候使用
    let [data,setData] = useState([]);
    //在组件挂载或即将挂载时候调用
    useEffect(()=>{
        console.log(ApiUtil.API_PAPER_GET_USER_ALL_BASE_INFORMATION+localStorage.getItem("global_username"))
        axios.post(ApiUtil.API_PAPER_GET_USER_ALL_BASE_INFORMATION+localStorage.getItem("global_username"),{
            // params:{
            //     pagesize:10,
            //     pagenum:1
            // },
            // headers:{
            //     Authorization:sessionStorage.token
            // }
        })
            .then(res=>{
                let {data} = res;
                if(data.code === 0) {
                    message.success(data.msg)
                    console.log(data)
                    setData(data.data)
                }
                //message.success(data.msg)

            })
    },[])

    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Button type="primary" onClick={() => {
                setreturnOrderModal(true);
            }}>
                增添文章
            </Button>
            <Modal
                visible={returnOrderModal}
                closable = {false}
                onCancel={() => {
                    setreturnOrderModal(false);
                    //batchPrint(0);
                }}
                onOk = {() => {
                    setreturnOrderModal(false);
                    //batchPrint(1);
                }}
                cancelText="关闭1"
                okText="关闭2" >
                <UploadPaper/>
            </Modal>
        </div>
    )
};

export default TableAll;