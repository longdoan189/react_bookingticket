import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import { SET_THONG_TIN_NGUOI_DUNG } from '../../redux/actions/types/QuanLyNguoiDungType';
import { hideLoadingAction, showLoadingAction } from "./LoadingActions";
import swal from 'sweetalert';


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                //Chuyển hướng đăng nhập về home khi đăng nhập thành công
                history.push('/');
            }

            console.log('result', result);
        } catch (error) {
            console.log('error', error.response);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.statusCode === 200) {
                console.log(result.data.content, DANG_KY_ACTION)
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                })
                //Chuyển hướng đăng nhập về trang trước đó
                swal({
                    title: "Register success!",
                    text: `
                        Username: ${result.data.content.taiKhoan} 
                        Password: ${result.data.content.matKhau} 
                    `,
                    icon: "success",
                });
                history.push(`/login`);
            }

            console.log('result', result);
        } catch (error) {
            console.log('error', error.response);
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            await dispatch(showLoadingAction);
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
            console.log(result);
            dispatch(hideLoadingAction);

        }
        catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error.response.data);
        }
    }
}


















