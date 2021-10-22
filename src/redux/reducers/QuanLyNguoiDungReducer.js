import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_THONG_TIN_TAI_KHOAN, SET_DANH_SACH_NGUOI_DUNG, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, THEM_NGUOI_DUNG } from '../../redux/actions/types/QuanLyNguoiDungType';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';


let user = {}
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    arrUsers: [],
    userInfo: {},
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state }
        }

        case DANG_KY_ACTION: {
            const { thongTinDangKy } = action;
            return { ...state }
        }

        case SET_DANH_SACH_NGUOI_DUNG: {
            state.arrUsers = action.arrUsers;
            return { ...state }
        }

        case THEM_NGUOI_DUNG: {
            state.arrUsers = action.arrUsers;
            return { ...state }
        }

        case LAY_THONG_TIN_TAI_KHOAN: {
            state.userInfo = action.userInfo;
            return { ...state }
        }

        default: return { ...state }
    }
}