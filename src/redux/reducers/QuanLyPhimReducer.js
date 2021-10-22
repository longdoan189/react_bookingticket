import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [
        {
            "maPhim": 1322,
            "tenPhim": "John Wick II33",
            "biDanh": "john-wick-ii33",
            "trailer": "https://www.youtube.com/embed/XGk2EfbD_Ps",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/john-wick-ii_gp09.jpeg",
            "moTa": "Mạng đổi mạng là một bộ phim hành động Mỹ sản xuất năm 2014, được đạo diễn bởi Chad Stahelski. Phim có sự tham gia của các diễn viên Keanu Reeves, Michael Nyqvist, Alfie Allen, Adrianne Palicki, Bridget Moynahan, Ian McShane, Willem Dafoe, John Leguizamo và Dean Winters",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2021-10-03T22:07:00.65",
            "danhGia": 9,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
    ],
    dangChieu: false,
    sapChieu: true,
    arrFilmDefault: [],
    filmDetail: {},
    thongTinPhim: {}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm;
            return {...state}
        }

        case SET_FILM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(phim => phim.dangChieu === state.dangChieu);
            return {...state}
        }

        case SET_FILM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;
            state.arrFilm = state.arrFilmDefault.filter(phim => phim.sapChieu === state.sapChieu);
            return {...state}
        }

        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail;
            return {...state}
        }

        case SET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            return {...state}
        }

        default: return { ...state }
    }
}