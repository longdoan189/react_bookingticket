import { UserOutlined } from '@ant-design/icons';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { Input, Modal, Rate, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { history } from '../../App';
import '../../assets/styles/circle.css';
import { layThongTinChiTietPhim } from '../../redux/actions/types/QuanLyRapActions';


const { TabPane } = Tabs;


export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    console.log({ filmDetail })

    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinChiTietPhim(id));
    }, []);


    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100%' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh' }}
                effectColor="#fff"
                color="#fff"
                blur={20}
                borderRadius={0}
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} alt="..." style={{ width: '100%', height: 300 }} />
                            <div className="col-span-2 ml-5" style={{ marginTop: '30%' }}>
                                <p className="text-sm">Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')} </p>
                                <h1 className="text-4xl text-white">{filmDetail.tenPhim}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '18%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-transparent ml-32 w-10/12 mt-20 px-5 py-5 container">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={
                                                <div>
                                                    <img src={htr.logo} className="rounded-full" width={50} />
                                                    <article className="font-medium">{htr.tenHeThongRap}</article>
                                                </div>
                                            }
                                            key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div key={index}>
                                                    <div className="flex flex-row mt-5">
                                                        <img src={cumRap.hinhAnh} width={60} height={60} />
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1, paddingTop: 20 }}>{cumRap.tenCumRap}</p>
                                                            <p className="text-black font-semibold">{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 mt-5 text-green-400 font-bold text-xl">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2">
                            <ThongTin {...props} />
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            <DanhGia {...props} />
                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>
        </div>
    )
}


export function ThongTin(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);

    return <div>
        <div className="grid grid-cols-12 mt-5">
            <div className="col-span-7 text-base">
                <p className="grid grid-cols-3"><span className="font-bold">Ngày khởi chiếu</span> <article className="font-semibold">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</article></p>
                <div className="mt-5">
                    <p className="grid grid-cols-3"><span className="font-bold">Trailer</span><a href={`${filmDetail.trailer}`} target="_blank" className="font-semibold">{filmDetail.trailer}</a></p>
                </div>
            </div>
            <div className="col-span-5 text-base">
                <span className="font-bold">Nội dung</span>
                <div className="mt-5">
                    <span className="font-semibold">{filmDetail.moTa}</span>
                </div>
            </div>
        </div>
    </div>
}


export function DanhGia(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { TextArea } = Input;
    const desc = ['Tệ', 'Hơi tệ', 'Bình thường', 'Hay', 'Tuyệt vời'];
    const handleChangeRate = () => { }
    const onChange = e => {
        console.log(e.target);
    };

    const [state, setState] = useState({
        modalVisible: false
    });

    const setModal2Visible = async (modalVisible) => {
        if (!userLogin.taiKhoan) {
            await swal({
                title: "Bạn cần phải đăng nhập !!!",
                buttons: 'Đăng nhập',
                icon: "warning",
            });
            history.push('/login');
        } else {
            setState({ modalVisible });
        }
    }

   

    return <div>
        <div className="mx-32 mt-10">
            <div style={{ position: 'absolute', right: '430px', bottom: '41.5%', zIndex: 10 }}>
                <Rate tooltips={desc} onChange={handleChangeRate} value={`${filmDetail.danhGia}`} />
            </div>
            <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 10, marginLeft: '10%' }} className="text-2xl rounded-full bg-blue-400 mt-1.5">{userLogin.taiKhoan ? userLogin.taiKhoan.substr(0, 1) : <UserOutlined />}
            </div>
            <div style={{ width: 520, background: 'transparent', position: 'relative', zIndex: 1, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '15%' }} className="border rounded border-white" onClick={() => setModal2Visible(true)}>
                <p style={{ marginRight: '45%' }} className="font-semibold pt-3.5">Bạn nghĩ gì về phim này?</p>
            </div>
            <Modal
                title="Đánh giá phim"
                centered
                visible={state.modalVisible}
                onOk={() => setModal2Visible(false)}
                onCancel={() => setModal2Visible(false)}
            >
                <p className="text-green-400 text-5xl font-medium text-center mb-1">{filmDetail.danhGia.toFixed(1)}</p>
                <Rate style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30, marginBottom: '20px' }} tooltips={desc} onChange={handleChangeRate} value={`${filmDetail.danhGia}`} />
                <TextArea placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này..." allowClear onChange={onChange} />
            </Modal>
        </div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-16 mx-auto">
                <div className="flex flex-wrap -m-2" >
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/900" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Holden Caulfield</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} value={5} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/800" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Henry Letham</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/700" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Oskar Blinde</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={3.5} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/600" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">John Doe</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={3} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/500" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Martin Eden</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={4} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/400" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Boris Kitua</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={3.5} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/300" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Atticus Finch</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={2.5} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Alper Kamu</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={1} />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://i.pravatar.cc/100" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-semibold text-xl m-0">Rodrigo Monchi</h2>
                                <Rate tooltips={desc} onChange={handleChangeRate} allowHalf value={4.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}
