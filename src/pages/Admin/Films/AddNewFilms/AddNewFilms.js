import { Button } from '@tsamantanis/react-glassmorphism';
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';

const AddNewFilms = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        onSubmit: values => {
            console.log('values', values);
            values.maNhom = GROUPID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(themPhimUploadHinhAction(formData));
        }
    });

    const handleChangeDatePicker = (values) => {
        let ngayKhoiChieu = moment(values).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeImg = (e) => {
        //Lấy file từ e
        let file = e.target.files[0];
        if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg") {
            //Tạo đối tượng đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result); // Hình base 64
            }
        }
        //Đem dữ liệu file lưu vào formik
        formik.setFieldValue('hinhAnh', file);
        // console.log('file', file);
    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

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
                <h3 className="text-4xl">Thêm phim mới</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber min={1} max={10} onChange={handleChangeInputNumber('danhGia')} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeImg} accept="image/jpeg,image/png,image/gif,image/jpg" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/150/150" }} />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <div>
                        <button type="submit" className="bg-blue-500 text-white p-2">Thêm phim</button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddNewFilms;