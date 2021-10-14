import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { CHANGE_TAB, CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeType";



const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [{maGhe:51582},{maGhe:51583}],
    activeTab: '1'
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }

        case DAT_VE: {
            //Cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];

            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon);
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return { ...state }
        }

        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return {...state}
        }

        case CHUYEN_TAB: {
            state.activeTab = '2';
            return {...state}
        }

        case CHANGE_TAB: {
            state.activeTab = action.number;
            return {...state}
        }

        default: return { ...state }
    }
}