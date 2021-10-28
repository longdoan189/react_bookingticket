import React from 'react';
import { Table, Tooltip } from 'antd';
import { Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../util/settings/config';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import ReactHtmlParser from 'react-html-parser';

export default function Users(props) {

    const { arrUsers } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('arrUsers', arrUsers);

    const dispatch = useDispatch();
    let current_page_num = 0;

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, []);


    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                let stt = ReactHtmlParser((index+1)+10*current_page_num);
                return <div>{stt}</div>
            }
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = b.taiKhoan.toLowerCase().trim();
                if (taiKhoanA > taiKhoanB) {
                    return 1;
                } else {
                    return -1;
                }
            },

        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
        },
        {
            title: 'Tác vụ',
            dataIndex: 'tacVu',
            render: (text,user) => {
                return <Fragment>
                    <Tooltip title="Cập nhật người dùng">
                        <NavLink className="mr-2 text-xl p-2" to={`/admin/users/edit/${user.taiKhoan}`}>
                            <EditOutlined style={{ color: 'green' }} />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Xóa người dùng">
                        <span className="text-xl p-2">
                            <DeleteOutlined style={{ color: 'red' }} onClick={() => {
                                if (window.confirm(`Bạn có chắc muốn xóa tài khoản ${text?.taiKhoan} không ?`)) {
                                    dispatch(xoaNguoiDungAction(user.taiKhoan));
                                }
                            }} />
                        </span>
                    </Tooltip>
                </Fragment>
            }
        }
    ];

    const data = arrUsers;

    function onChange(pagination, filters, sorter, extra) {
        current_page_num = pagination.current-1;
        console.log('pagination', pagination.current);
        console.log('current_page_num',current_page_num);
    }

    const { Search } = Input;
    const onSearch = value => {
        console.log(value);
        dispatch(layDanhSachNguoiDungAction(value));
    };

    return (
        <div>
            <h3 className="text-4xl">Quản Lý Người Dùng</h3>
            <Button type="dashed" className="mb-5" onClick={() => {
                history.push('/admin/users/addnew');
            }}>Thêm người dùng</Button>
            <Search className="mb-10" placeholder="Nhập tài khoản người dùng" onSearch={onSearch} enterButton size="large" />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'taiKhoan'} />
        </div>
    )
}
