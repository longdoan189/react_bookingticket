import { ContactsOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Tabs } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatTaiKhoanAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';
import _ from 'lodash';


export default function Profile(props) {

    const { TabPane } = Tabs;

    return (
        <div className="pt-52">
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span className="text-xl">
                            <UserOutlined style={{ fontWeight: 'bold', fontSize: 25 }} />
                            Thông tin cá nhân
                        </span>
                    }
                    key="1"
                >
                    <ThongTinCaNhan {...props} />
                </TabPane>
                <TabPane
                    tab={
                        <span className="text-xl">
                            <ContactsOutlined style={{ fontWeight: 'bold', fontSize: 25 }} />
                            Lịch sử đặt vé
                        </span>
                    }
                    key="2"
                >
                    <LichSuDatVe {...props} />
                </TabPane>
            </Tabs>,
        </div>
    )
}


export function ThongTinCaNhan(props) {

    const [componentSize, setComponentSize] = useState('default');
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction(thongTinNguoiDung.taiKhoan));
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            soDT: thongTinNguoiDung.soDT,
            maNhom: thongTinNguoiDung.maNhom,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            hoTen: thongTinNguoiDung.hoTen
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            console.log(values);

            dispatch(capNhatTaiKhoanAction(values));
        }
    });

    return <div>
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h3 className="text-3xl text-center my-10 text-blue-500 font-medium">THÔNG TIN CÁ NHÂN</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tài khoản">
                <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item label="Mật khẩu">
                <Input name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item label="Họ tên">
                <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item label="Email">
                <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input name="soDT" onChange={formik.handleChange} value={formik.values.soDT} />
            </Form.Item>
            <Form.Item label="Button">
                <Button htmlType="submit" type="dashed">Cập nhật</Button>
            </Form.Item>
        </Form>
    </div>
}


export function LichSuDatVe(props) {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const renderHistoryBooking = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index)=>{
            const location = _.first(ticket.danhSachGhe);

            return <div style={{cursor:'pointer'}} className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg hover:bg-blue-300">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-blue-500 text-2xl title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-600 text-xl font-medium">{location.tenHeThongRap}</p>
                        <p className="text-gray-600">Ngày đặt: {moment(ticket.ngayDat).format('DD-MM-YYYY')} - Giờ đặt: {moment(ticket.ngayDat).format('hh:mm:ss')}</p>
                    </div>
                </div>
            </div>
        })
    }

    return <div>
        <section className="body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-4xl font-medium title-font mb-4 text-blue-500">LỊCH SỬ ĐẶT VÉ</h1>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderHistoryBooking()}
                </div>
            </div>
        </section>
    </div>
}