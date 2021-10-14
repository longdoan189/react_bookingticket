import React, { Fragment, useEffect } from 'react';
import { Button, Table } from 'antd';
import { Input, Space } from 'antd';
import { SearchOutlined,EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';

const { Search } = Input;
const onSearch = value => console.log(value);

export default function Films(props) {

    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    console.log('arrFilmDefault', arrFilmDefault);

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            value: (text, object) => { return <span>{text}</span> },
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: '15%'
            // sortOrder: 'descend'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                } else {
                    return -1;
                }
            },
            width: '20%'
        },
        {
            title: 'Mô tả phim',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaPhimA = a.moTa.toLowerCase().trim();
                let moTaPhimB = b.moTa.toLowerCase().trim();
                if (moTaPhimA > moTaPhimB) {
                    return 1;
                } else {
                    return -1;
                }
            },
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 150 ? film.moTa.slice(0, 150) + '...' : film.moTa}
                </Fragment>
            },
            width: '25%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <Fragment>
                    <NavLink className="  mr-2 text-xl p-2" to="/"><EditOutlined style={{color:'green'}} /></NavLink>
                    <NavLink className="text-xl p-2" to="/"><DeleteOutlined style={{color:'red'}} /></NavLink>
                </Fragment>
            },
            width: '20%'
        },
    ];

    const data = arrFilmDefault;

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h3 className="text-4xl">Quản Lý Phim</h3>
            <Button className="mb-5">Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
