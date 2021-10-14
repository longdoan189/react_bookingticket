import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Checkout.module.css';
import _ from 'lodash';
import { layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import './Checkout.css';
import { CloseCircleOutlined, UserOutlined, CheckOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';
import { CHANGE_TAB, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import { datVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { history } from '../../App';
import { TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from '../../util/settings/config';
import { NavLink } from 'react-router-dom';


function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
    console.log('danhSachGheDangDat', danhSachGheDangDat);

    const dispatch = useDispatch();

    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action);
    }, []);

    console.log('chiTietPhongVe', chiTietPhongVe);

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderGhe = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''

            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDat';
            }

            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} key={index}>
                    {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /> : <CloseCircleOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /> : classGheKhachDat ? <TeamOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /> : ghe.stt}
                </button>
                {(index + 1) % 10 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black" style={{ width: '80%', height: 15 }}>

                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="text-black mt-3">Màn hình</h3>
                        </div>
                        <div className="mt-5">
                            {renderGhe()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className="w-full divide-y divide-gray-200 text-left table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế Vip</th>
                                    <th>Ghế đã được đặt</th>
                                    <th>Ghế bạn đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td><button className="ghe text-center ml-5"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDangDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDaDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheKhachDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3">
                    <h3 className="text-green-500 text-center text-4xl mt-5">
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()}đ
                    </h3>
                    <hr />
                    <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                    <p>{thongTinPhim.cumRap}</p>
                    <p>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
                    <hr />
                    <div style={{ width: '100%' }}>
                        <table className="border-collapse border-green-400 w-full text-center  border-4">
                            <thead className="w-full" style={{ width: '100%' }}>
                                <tr className="text-2xl">
                                    <th className="border">Ghế</th>
                                    <th className="border">Loại Ghế</th>
                                    <th className="border">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                    return <tr key={index} className="text-xl">
                                        <td className="border">{gheDD.stt}</td>
                                        <td className="border">{gheDD.loaiGhe}</td>
                                        <td className="border">{(gheDD.giaVe).toLocaleString()}đ</td>
                                    </tr>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="border"></td>
                                    <td className="border"></td>
                                    <td className="border">
                                        <span className="text-green-500 text-2xl font-bold">
                                            {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                                return tongTien += ghe.giaVe;
                                            }, 0).toLocaleString()}đ
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <div className="my-5">
                        <i>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div className="mb-0 flex flex-col items-center h-full">
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            console.log('thongTinDatVe', thongTinDatVe);

                            dispatch(datVeAction(thongTinDatVe));
                        }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl border-2 border-indigo-800" style={{ cursor: 'pointer' }}>
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const { TabPane } = Tabs;

export default function (props) {
    const { activeTab } = useSelector(state => state.QuanLyDatVeReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch({
                type: CHANGE_TAB,
                number: '1'
            })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button onClick={() => {
                history.push('/profile');
            }}> <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-2xl rounded-full bg-green-400 ml-5">{userLogin.taiKhoan.substr(0, 1)}</div>Hello {userLogin.taiKhoan} !
            </button>
            <button className="text-blue-800" onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
            }}>Đăng xuất</button>
        </Fragment> : ''}
    </Fragment>

    return <div className="p-5">
        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={activeTab} onChange={(key) => {
            dispatch({
                type: CHANGE_TAB,
                number: key
            })
        }}>
            <TabPane tab="01 CHỌN GHẾ && THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NavLink to="/home">
                    <HomeOutlined style={{ fontSize: 25, marginLeft: 15 }} />
                </NavLink>
            </div>} key="3">
            </TabPane>
        </Tabs>
    </div>
}


export function KetQuaDatVe(props) {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} width={50} height={50} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY')}</p>
                        <p>Địa điểm: {seats.tenHeThongRap}</p>
                        <p>
                            Tên rạp: {seats.tenCumRap} - Ghế: {ticket.danhSachGhe.map((ghe, index) => {
                                return <span key={index} className="mr-1">[{ghe.tenGhe}]</span>
                            })}
                        </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className="p-5">
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-green-600">KẾT QUẢ ĐẶT VÉ</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Vui lòng xác nhận thông tin của bạn</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}
