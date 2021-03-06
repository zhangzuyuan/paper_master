import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb, Button, Modal} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Outlet,NavLink} from 'react-router-dom';
import Table from "./PaperBaseInformation/TableAll/TableAll";
import TableAll from "./PaperBaseInformation/TableAll/TableAll";
import UploadPaper from "./PaperBaseInformation/UploadPaper/UploadPaper";
import {Link} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//     const key = String(index + 1);
//     return {
//         key: `sub${key}`,
//         icon: React.createElement(icon),
//         label: `subnav ${key}`,
//         children: new Array(4).fill(null).map((_, j) => {
//             const subKey = index * 4 + j + 1;
//             return {
//                 key: subKey,
//                 label: <NavLink>`option${subKey}`</NavLink>,
//             };
//         }),
//     };
// });
const HomePage = () => {


    return <Layout style={{height: '100vh'}}>
        <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
        </Header>
        <Content
            style={{
                padding: '0 50px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
                className="site-layout-background"
                style={{
                    padding: '24px 0',
                }}
            >
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                        }}
                        items={items2}
                    >
                    </Menu>
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                    }}
                >

                    {/*<TableAll/>*/}
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Content>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ??2018 Created by Ant UED
        </Footer>
    </Layout>
};

export default HomePage;

const items2=[
    {
        key:'user',
        icon:<UserOutlined/>,
        label:"????????????",
        children:[
            {
                key:'information',
                label:<NavLink to="/HomePage/UserBaseInformation">????????????</NavLink>
            },
            {
                key:'update_information',
                label:<NavLink to="/HomePage/UpdateUserBaseInformation">??????????????????</NavLink>
            },
        ]
    },
    {
        key:'paper_base',
        icon:<LaptopOutlined/>,
        label: "????????????",
        children: [
            {
                key:'paper_base_information',
                label:<NavLink to="/HomePage/TableAll">??????????????????</NavLink>
            },
            {
                key:'paper_type_information',
                label:<NavLink to="/HomePage/TableType">??????????????????</NavLink>
            }
        ]
    },
    {
        key:'type_information',
        icon:<NotificationOutlined/>,
        label:"??????????????????",
        children: [
            {
                key:'conference_information',
                label:<NavLink to="">????????????</NavLink>,
            },
            {
                key:'journal_information',
                label:<NavLink to="">????????????</NavLink>
            }
        ]
    },
    {
        key:"analyse",
        label:"????????????",
        children: [
            {
                key:"survey",
                label: <NavLink to="/HomePage/PaperSurvey">????????????</NavLink>
            },
        ]
    },
    {
        key:"community",
        label: "??????",
        children: [
            {
                key:"author",
                label: "????????????",
            },
            {
                key:"friend",
                label: "??????",
            },
            {
                key:"relation",
                label: "??????????????????????????????",
            }
        ]
    }
]