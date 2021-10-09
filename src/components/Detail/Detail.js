import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import '../../assets/styles/circle.css';
import { Tabs, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/types/QuanLyRapActions';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;


export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    console.log({ filmDetail })

    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id));

    }, [])

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
                                <p>{filmDetail.moTa?.length > 100 ? <span>{filmDetail.moTa.slice(0,100)} ...</span>:<span>{filmDetail.moTa}</span>}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '18%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia/2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white ml-32 w-10/12 mt-20 px-5 py-5 container">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={
                                                <div>
                                                    <img src={htr.logo} className="rounded-full" width={50} />
                                                    {htr.tenHeThongRap}
                                                </div>
                                            }
                                            key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div key={index}>
                                                    <div className="flex flex-row mt-5">
                                                        <img src={cumRap.hinhAnh} width={60} height={60} />
                                                        <div className="ml-2">
                                                            <p style={{fontSize:20, fontWeight:'bold',lineHeight:1, paddingTop:20}}>{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400">{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0,12).map((lichChieu,index)=>{
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 mt-5 text-green-800 font-bold text-xl">
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
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>
        </div>
    )
}
