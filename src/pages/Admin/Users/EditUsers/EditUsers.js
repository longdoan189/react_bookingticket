import { Form, Input, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layThongTinTaiKhoanAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';
import { GROUPID } from '../../../../util/settings/config';


const EditUsers = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const { userInfo } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let { taikhoan } = props.match.params;
        dispatch(layThongTinTaiKhoanAction(taikhoan));
    }, []);

    const [state, setState] = useState({
        userType: []
    });

    useEffect(async () => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            setState({
                ...state,
                userType: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userInfo.taiKhoan,
            matKhau: userInfo.matKhau,
            email: userInfo.email,
            soDT: userInfo.soDT,
            maNhom: '',
            maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
            hoTen: userInfo.hoTen
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            dispatch(capNhatThongTinNguoiDungAction(values));
            // console.log('values', values);
        }
    });

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeSelect = (value) => {
        // console.log(value);
        formik.setFieldValue('maLoaiNguoiDung', value);
    }

    return (
        <>
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
                <h3 className="text-4xl">Cập nhật người dùng</h3>
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
                <Form.Item label="Loại người dùng">
                    <Select name="maLoaiNguoiDung" onChange={handleChangeSelect} options={state.userType?.map((type, index) => ({ label: type.tenLoai, value: type.maLoaiNguoiDung, key: index }))} value={formik.values.maLoaiNguoiDung}>
                    </Select>
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <div>
                        <button type="submit" className="bg-blue-500 text-white p-2">Cập nhật</button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditUsers;