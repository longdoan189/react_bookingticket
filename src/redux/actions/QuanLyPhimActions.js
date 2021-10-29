import swal from 'sweetalert';
import { history } from '../../App';
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";


export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors);
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData);
            await swal({
                title: "Thêm phim thành công !!!",
                icon: "success",
            });
            console.log('result', result.data.content);
            history.push('/admin/films');
        }
        catch (error) {
            console.log('error', error.response.data);
            swal({
                title: `${error.response.data.content}`,
                buttons: 'OK',
                icon: "error",
            });
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);

            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.response.data);
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(formData);
            console.log('result', result.data.content);

            await swal({
                title: "Cập nhật phim thành công !!!",
                icon: "success",
            });

            history.push('/admin/films'); 
        } catch (errors) {
            console.log('errors', errors.response.data);
            swal({
                title: `${errors.response.data.content}`,
                buttons: 'OK',
                icon: "error",
            });
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            console.log('result', result.data.content);

            await swal({
                title: "Xóa phim thành công !!!",
                icon: "success",
            });
            dispatch(layDanhSachPhimAction());

        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}