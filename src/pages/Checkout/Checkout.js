import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Checkout.module.css';
import _ from 'lodash';
import { layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import './Checkout.css';
import { CloseCircleOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import { datVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';


function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

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
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`} key={index}>
                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /> : <CloseCircleOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /> : ghe.stt}
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
                        <table className="w-2/3 divide-y divide-gray-200 text-left table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế Vip</th>
                                    <th>Ghế đã được đặt</th>
                                    <th>Ghế bạn đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td><button className="ghe text-center ml-5"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDangDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDaDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"><CheckOutlined style={{ fontWeight: 'bold', fontSize: 20 }} /></button></td>
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
    return <div className="p-5">
        <Tabs defaultActiveKey="1" >
            <TabPane tab="01 CHỌN GHẾ && THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
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
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">{ticket.ngayDat}</p>
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
