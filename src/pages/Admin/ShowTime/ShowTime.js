import { Button, DatePicker, Form, InputNumber, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { quanLyRapService } from '../../../services/QuanLyRapService';


export default function ShowTime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            console.log('values', values);
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);

                await swal({
                    title: "SUCCESS",
                    text: `${result.data.content}`,
                    buttons: 'OK',
                    icon: "success",
                });
            } catch (errors) {
                console.log('errors', errors?.response.data);
            }
        }
    });

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    });

    useEffect(async () => {
        try {
            const result = await quanLyRapService.layThongTinHeThongRap();
            setState({
                ...state,
                heThongRapChieu: result.data.content
            });
            console.log('heThongRapChieu', result.data.content)
        } catch (errors) {
            console.log('errors', errors?.response.data);
        }
    }, []);

    const handleChangeHeThongRap = async (values) => {
        try {
            const result = await quanLyRapService.layThongTinCumRapTheoHeThong(values);
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
            console.log('cumRapChieu', result.data.content);
        } catch (errors) {
            console.log('errors', errors?.response.data);
        }
    }

    const handleChangeCumRap = (values) => {
        formik.setFieldValue('maRap', values);
        console.log('cumRap', values);
    }

    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe', values);
    }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onSubmitCapture={formik.handleSubmit}
        >
            <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
            <Form.Item label="Hệ thống rạp">
                <Select options={state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.maHeThongRap, key: index }))} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
            </Form.Item>

            <Form.Item label="Cụm rạp">
                <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap, key: index }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
            </Form.Item>

            <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
            </Form.Item>

            <Form.Item label="Giá vé">
                <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
            </Form.Item>

            <Form.Item label="Tác vụ">
                <Button htmlType="submit">Tạo lịch chiếu</Button>
            </Form.Item>
        </Form>
    )
}
