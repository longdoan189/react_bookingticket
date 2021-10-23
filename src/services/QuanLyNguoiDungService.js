import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";


export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }

    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

    layDanhSachNguoiDung = (taikhoan = '') => {
        if (taikhoan !== '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taikhoan}`);
        } else {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
        }
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }

    themNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung);
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }

    layThongTinTaiKhoan = (taiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
    }

    capNhatNguoiDung = (nd) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nd);
    }

    capNhatTaiKhoan = (user) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,user);
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();




