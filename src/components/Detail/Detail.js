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
import '../../pages/Home/HomeMenu/HomeMenu.css';

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
                <div className="grid grid-cols-3 sm:grid-cols-12 mt-5">
                    <div className="col-span-5 sm:col-start-3">
                        <div className="grid sm:grid-cols-3 grid-cols-1">
                            <img className="col-span-1" src={filmDetail.hinhAnh} alt="..." className="w-full md:w-full sm:h-80 h-full" />
                            <div className="col-span-2 ml-5" style={{ marginTop: '30%' }}>
                                <p className="text-sm text-black font-medium ml-12 sm:ml-0">Ngày khởi chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')} </p>
                                <h1 className="text-4xl text-black ml-5 md:ml-0">{filmDetail.tenPhim}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ml-12 sm:ml-0">
                        <h1 style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }} className="sm:ml-20 ml-20">Đánh giá</h1>
                        <h1 className="text-green-400 text-2xl text-center mr-10 md:mr-3 lg:text-left lg:ml-5"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span className='sm:bg-transparent rounded-full font-medium'>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-transparent lg:ml-32 md:ml-12 ml-0 sm:w-10/12 mt-20 sm:px-5 px-0 py-5">
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
                                                    <div className="thong-tin-lich-chieu grid grid-cols-2 sm:grid-cols-4">
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
            <div className="lg:col-span-7 col-span-12 text-base">
                <p className="grid grid-cols-3">
                    <span className="font-bold">Ngày khởi chiếu</span>
                    <span className="font-semibold">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</span>
                </p>
                <div className="mt-5 md:break-normal break-words">
                    <p className="grid grid-cols-3"><span className="font-bold">Trailer</span><a href={`${filmDetail.trailer}`} target="_blank" className="font-semibold">{filmDetail.trailer}</a></p>
                </div>
            </div>
            <div className="lg:col-span-5 col-span-12 text-base md:break-normal break-words">
                <span className="font-bold">Nội dung</span>
                <div className="mt-5">
                    <span className="font-semibold w-10/12 md:w-full block">{filmDetail.moTa}</span>
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
        <div className="mx-0 lg:mx-32 mt-10">
            <div style={{ background: 'transparent', position: 'relative', zIndex: 1, cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }} className="border rounded border-black md:ml-20 md:w-3/4 lg:w-4/5 w-4/5 ml-5 grid grid-cols-1 sm:grid-cols-3" onClick={() => setModal2Visible(true)}>
                <div className='ml-8 mt-2 mb-2'>
                    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-2xl rounded-full bg-blue-400 mt-1.5 ml-20 sm:ml-0">{userLogin.taiKhoan ? userLogin.taiKhoan.substr(0, 1).toUpperCase() : <UserOutlined />}
                    </div>
                </div>
                <div className='ml-12 sm:-ml-12 lg:-ml-24 mt-2'>
                    <span className="font-semibold pt-3.5">Bạn nghĩ gì về phim này ?</span>
                </div>
                <div className="ml-16 sm:ml-0 mt-1.5 mb-2 sm:mb-2">
                    <Rate tooltips={desc} onChange={handleChangeRate} value={`${filmDetail.danhGia / 2}`} />
                </div>
            </div>
            <Modal
                title="Đánh giá phim"
                centered
                visible={state.modalVisible}
                onOk={() => setModal2Visible(false)}
                onCancel={() => setModal2Visible(false)}
            >
                <p className="text-green-400 text-5xl font-medium text-center mb-1">{filmDetail.danhGia.toFixed(1)}</p>
                <Rate style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30, marginBottom: '20px' }} tooltips={desc} onChange={handleChangeRate} allowHalf value={`${filmDetail.danhGia / 2}`} />
                <TextArea placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này..." allowClear onChange={onChange} />
            </Modal>
        </div>
        <section className="text-gray-600 body-font">
            <div className="container sm:px-5 px-0 py-16 sm:mx-auto -ml-1.5">
                <div className="flex flex-wrap -m-2">
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