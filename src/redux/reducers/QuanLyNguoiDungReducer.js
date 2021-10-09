import {DANG_NHAP_ACTION} from '../../redux/actions/types/QuanLyNguoiDungType';
import { USER_LOGIN } from '../../util/settings/config';


let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));

            return {...state, userLogin:thongTinDangNhap}
        }


        default: return { ...state }
    }
}