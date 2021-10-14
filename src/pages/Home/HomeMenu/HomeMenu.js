import React, { Fragment, useEffect } from 'react';
import { Tabs, Radio, Space } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const { TabPane } = Tabs;

export default function HomeMenu(props) {
    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }

    useEffect(() => {
        console.log('heThongRapChieu', props);
    }, []);

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };

    const renderHeThongRap = () => {
        return props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width={50} />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div style={{ width: '300px', display: 'flex' }}>
                                <img src="https://s3img.vcdn.vn/123phim/2018/10/lotte-cinema-nam-sai-gon-15383867312967.jpg" width={50} />
                                <div className="text-left ml-2">
                                    {cumRap.tenCumRap}
                                    <p className="text-blue-600">{t('detail')}</p>
                                </div>
                            </div>
                        } key={index}>
                            {/*Load phim tương ứng */}
                            {cumRap.danhSachPhim?.slice(0,4).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5">
                                        <div style={{ display: 'flex' }}>
                                            <img style={{ width: 75, height: 75 }} src={phim.hinhAnh} onError={(e)=>{e.target.onerror = null; e.target.src="https://picsum.photos/75/75"}} />
                                            <div className="ml-2">
                                                <h1 className="text-2xl text-green-700">{phim.tenPhim}</h1>
                                                <p>{cumRap.diaChi}</p>
                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink className="text-xl text-red-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    const { tabPosition } = state;
    return (
        <>
            <Tabs tabPosition={tabPosition}>
                {renderHeThongRap()}
            </Tabs>
        </>
    )
}
