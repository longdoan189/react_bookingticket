import swal from 'sweetalert';
import { history } from "../../App";
import { SET_THONG_TIN_NGUOI_DUNG } from '../../redux/actions/types/QuanLyNguoiDungType';
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_THONG_TIN_TAI_KHOAN, SET_DANH_SACH_NGUOI_DUNG, THEM_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.data.statusCode === 200) {
                await dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                await swal({
                    title: "SUCCESS",
                    text: "Đăng nhập thành công !!!",
                    buttons: 'OK',
                    icon: "success",
                });
                //Chuyển hướng đăng nhập về home khi đăng nhập thành công
                history.push('/');
            }
            
            console.log('result', result);
        } catch (error) {
            console.log('error', error.response);
            swal({
                title: "ERROR",
                text: "Tài khoản hoặc mật khẩu không đúng !!!",
                buttons: 'OK',
                icon: "error",
            });
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

export const layThongTinNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung(taiKhoan);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
            console.log(result);
        }
        catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const layDanhSachNguoiDungAction = (taiKhoan = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(taiKhoan);
            console.log('result', result.data.content);

            dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                arrUsers: result.data.content
            })
        } catch (error) {
            console.log('error', error.response?.data);
        }
    }
}

export const themNguoiDungAction = (nguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);
            console.log('result', result.data.content);

            await swal({
                title: "SUCCESS",
                text: "Thêm người dùng thành công !!!",
                buttons: 'OK',
                icon: "success",
            });
            dispatch({
                type: THEM_NGUOI_DUNG,
                arrUsers: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);

            await swal({
                title: "Xóa tài khoản thành công !!!",
                icon: "success",
            });

            dispatch(layDanhSachNguoiDungAction());
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const capNhatThongTinNguoiDungAction = (nd) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDung(nd);
            console.log('result', result.data.content);

            await swal({
                title: "Cập nhật người dùng thành công !!!",
                icon: "success",
            });

            history.push('/admin/users');

        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinTaiKhoanAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan(taiKhoan);
            console.log('result', result.data.content);

            dispatch({
                type: LAY_THONG_TIN_TAI_KHOAN,
                userInfo: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const capNhatTaiKhoanAction = (user) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatTaiKhoan(user);
            console.log('result', result.data.content);

            await swal({
                title: "Cập nhật tài khoản thành công !!!",
                icon: "success",
            });

        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

















