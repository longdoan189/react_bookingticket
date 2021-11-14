import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { Select, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import _ from 'lodash';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }
    const [show, toggleShow] = React.useState(false);
    const { width } = useWindowDimensions();
    /*Hien toan bo header hay khong => khi man hinh > 1024 mac dinh hien */
    let start_show = true;
    if (width < 1024) {
        start_show = false;
    }
    else {
        start_show = true;
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <button className="text-blue-800" onClick={() => {
                    history.push('/profile');
                }}>Cập nhật thông tin</button>
            </Menu.Item>
            <Menu.Item key="2">
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

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="self-center px-8 py-3 rounded" onClick={() => {
                    history.push('/login');
                }}>{t('signin')}</button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-cyan-400 dark:text-coolGray-900" onClick={() => {
                    history.push('/register');
                }}>{t('signup')}</button>
            </Fragment>
        } else {
            return (
                <Fragment>
                    <button style={{ pointerEvents: 'none' }} className="self-center mr-3 py-3 rounded" onClick={() => {
                        history.push('/profile');
                    }}>
                        {t("hello.1")}, <span className="text-blue-300 font-medium">{userLogin.taiKhoan}</span>
                    </button>
                    <button style={{ pointerEvents: 'none' }}>
                        <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-2xl rounded-full bg-blue-400 mx-3">{userLogin.taiKhoan.substr(0, 1).toUpperCase()}
                        </div>
                    </button>
                    <Dropdown className="mr-10" overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </Fragment>
            )
        }
    }

    return (
        <header className="p-1 bg-coolGray-100 text-coolGray-800 bg-black text-white bg-opacity-40 fixed w-full z-10">
            <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
                <div className="flex items-center flex-no-shrink text-white mr-6">
                    <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2 w-96">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                    </NavLink>
                </div>
                {!(show || start_show) &&
                    <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white" onClick={() => toggleShow(!show)}>
                        <svg className="h-4 w-12" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>}
                {(show || start_show) &&
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white" onClick={() => toggleShow(!show)}>
                            <svg className="h-4 w-12" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                        </button>
                    </div>
                }
                {(show || start_show) &&
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow font-medium">
                            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                                <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('home')}</NavLink>
                            </a>
                            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                                <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('contact')}</NavLink>
                            </a>
                            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white">
                                <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('news')}</NavLink>
                            </a>
                        </div>
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white ml-4">
                            {renderLogin()}
                        </a>
                        <div>
                            <a className="inline-block text-sm px-4 py-2 leading-none mt-4 lg:mt-0">
                                <Select defaultValue={localStorage.getItem('i18nextLng')} style={{ width: 100 }} onChange={handleChange}>
                                    <Option value="en">
                                        <div className="flex flex-row justify-between">
                                            <span className="text-base">EN</span>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png" style={{ width: 25, height: 25 }} />
                                        </div>
                                    </Option>
                                    <Option value="chi">
                                        <div className="flex flex-row justify-between">
                                            <span className="text-base">CN</span>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/225px-Flag_of_the_People%27s_Republic_of_China.svg.png" style={{ width: 25, height: 25 }} />
                                        </div>
                                    </Option>
                                    <Option value="vi">
                                        <div className="flex flex-row justify-between">
                                            <span className="text-base">VN</span>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png" style={{ width: 25, height: 25 }} />
                                        </div>
                                    </Option>
                                </Select>
                            </a>
                        </div>
                    </div>
                }
            </nav>
        </header>
    )
}