import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { hideLoadingAction, showLoadingAction } from "./LoadingActions";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
            console.log('result', result.data);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}


export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {
        try {
            await dispatch(showLoadingAction);
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log('result', result.data.content);
            //Đặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT });
            await dispatch({ type: CHUYEN_TAB });
            await dispatch(hideLoadingAction);

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke("datGheThanhCong", userLogin.taiKhoan, thongTinDatVe.maLichChieu)
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error.response.data);
        }
    }
}


export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('danhSachGheDangDat', danhSachGheDangDat);
        console.log('taiKhoan', taiKhoan);
        console.log('maLichChieu', maLichChieu);

        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //Call api signalR
        // connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
    }
}