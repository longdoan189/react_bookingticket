import { FileOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Dropdown } from 'antd';
import _ from 'lodash';
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import { history } from "../../App";
import { TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from "../../util/settings/config";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed) => {
        setCollapsed({ collapsed })
    }

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        }
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        swal({
            title: "WARNING",
            text: "Bạn không có quyền truy cập vào trang này !!!",
            buttons: 'Đã hiểu',
            icon: "error",
        });
        history.push('/');
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        swal({
            title: "WARNING",
            text: "Bạn không có quyền truy cập vào trang này !!!",
            buttons: 'Đã hiểu',
            icon: "error",
        });
        history.push('/');
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <button className="text-blue-800" onClick={() => {
                    history.push('/profile');
                }}>Cập nhật thông tin</button>
            </Menu.Item>
            <Menu.Item>
                <button className="text-blue-800" onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    localStorage.removeItem(TOKEN_CYBERSOFT);
                    history.push('/home');
                    window.location.reload();
                }}>Đăng xuất</button>
            </Menu.Item>
        </Menu>
    );

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button className="text-lg" style={{ pointerEvents: 'none' }}>
                Hello, <span className="text-green-500 font-medium">{userLogin.taiKhoan}</span>
            </button>
            <button style={{ pointerEvents: 'none' }}>
                <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-2xl rounded-full bg-green-400 mx-3 mb-5">{userLogin.taiKhoan.substr(0, 1)}
                </div>
            </button>
            <Dropdown className="mr-5" overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <DownOutlined />
                </a>
            </Dropdown>
        </Fragment> : ''}
    </Fragment>

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img style={{ cursor: 'pointer' }} src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" onClick={() => {
                            history.push('/');
                        }} />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <NavLink to="/admin/users/addnew">Add New Users</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add New Films</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, background: 'white' }}>
                        <div className="text-right pr-10 pt-1">
                            {operations}
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>

                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: 'white' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}


