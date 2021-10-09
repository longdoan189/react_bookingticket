import {SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU} from '../../actions/types/QuanLyRapType';
import {quanLyRapService} from '../../../services/QuanLyRapService';

export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layDanhSachHeThongRap();
            console.log('result', result);

            if(result.status === 200) {
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })
            }
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try{
            let result = await quanLyRapService.layThongTinLichChieuPhim(id);
            console.log('result', result);

            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content
            })
        }catch(errors){
            console.log('errors', errors.response?.data);
        }

    }
}