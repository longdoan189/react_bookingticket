import { DeleteOutlined, EditOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';

const { Search } = Input;


export default function Films(props) {

    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    // console.log('arrFilmDefault', arrFilmDefault);

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, []);

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
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 150 ? film.moTa.slice(0, 150) + '...' : film.moTa}
                </Fragment>
            },
            width: '25%'
        },
        {
            title: 'Tác vụ',
            dataIndex: 'maPhim',
            render: (text, film) => {
                return <Fragment>
                    <Tooltip title="Cập nhật phim">
                        <NavLink key={1} className="mr-2 text-xl p-2" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'green' }} /></NavLink>
                    </Tooltip>
                    <Tooltip title="Xóa phim">
                        <span key={2} style={{ cursor: 'pointer' }} className="text-xl p-2" onClick={() => {
                            if (window.confirm('Bạn có muốn xóa phim ' + film.tenPhim + ' không ?')) {
                                dispatch(xoaPhimAction(film.maPhim));
                            }
                        }}><DeleteOutlined style={{ color: 'red' }} /></span>
                    </Tooltip>
                    <Tooltip title="Tạo lịch chiếu">
                        <NavLink key={3} className="ml-2 text-xl p-2" to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`}><CalendarOutlined style={{ color: 'blue' }} /></NavLink>
                    </Tooltip>
                </Fragment>
            },
            width: '20%'
        },
    ];

    const data = arrFilmDefault;

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }

    const onSearch = value => {
        // console.log(value);
        dispatch(layDanhSachPhimAction(value));
    }

    return (
        <div>
            <h3 className="text-4xl">Quản Lý Phim</h3>
            <Button type="dashed" className="mb-5" onClick={() => {
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="Tìm kiếm phim...."
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
        </div>
    )
}
