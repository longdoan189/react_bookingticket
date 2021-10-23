import React, { Fragment } from 'react';
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


export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
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
                        <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-2xl rounded-full bg-blue-400 mx-3">{userLogin.taiKhoan.substr(0, 1)}
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
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-black text-white bg-opacity-40 fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex pt-5">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('news')}</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}

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
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}