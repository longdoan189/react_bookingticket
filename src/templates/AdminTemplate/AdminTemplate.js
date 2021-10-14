import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        // console.log(collapsed);
        setCollapsed({ collapsed })
    }

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        }
    })

    return <Route {...restProps} render={() => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Users
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileOutlined />}>
                            Films
                        </Menu.Item>
                        <Menu.Item key="9" icon={<DesktopOutlined />}>
                            Showtimes
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}