import { Form, Input, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';
import { GROUPID } from '../../../../util/settings/config';

const AddNewUsers = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch();

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
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            maLoaiNguoiDung: '',
            hoTen: ''
        },
        onSubmit: values => {
            values.maNhom = GROUPID;
            dispatch(themNguoiDungAction(values));
            // console.log('values', values);
        }
    });

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeSelect = (value) => {
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
                <h3 className="text-4xl">Thêm người dùng</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select name="maLoaiNguoiDung" placeholder="Chọn loại người dùng" onChange={handleChangeSelect} options={state.userType?.map((type, index) => ({ label: type.tenLoai, value: type.maLoaiNguoiDung, key: index }))}>
                    </Select>
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <div>
                        <button type="submit" className="bg-blue-500 text-white p-2">Thêm người dùng</button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddNewUsers;