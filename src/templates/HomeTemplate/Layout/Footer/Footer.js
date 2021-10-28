import React from 'react';
import { AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


export default function Footer(props) {
    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));
    console.log('arrHeThongRap', arrHeThongRap);

    return (
        <footer className="py-6 dark:bg-coolGray-800 dark:text-coolGray-50 bg-gray-800">
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className="grid grid-cols-12">
                    <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <a href="/" className="flex justify-center space-x-3 md:justify-start text-black">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-cyan-400">
                                <img style={{ maxWidth: '1000%', marginLeft: '150px' }} src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                            </div>
                        </a>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3 text-white">
                        <p className="pb-1 text-lg font-medium">{t('partner')}</p>
                        <div className="grid grid-cols-3">
                            {arrHeThongRap.map((htr, index) => {
                                return <div key={index} className="hover:opacity-50">
                                    <img src={htr.logo} className="w-full mt-5" style={{width:30, cursor:'pointer'}} />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3 text-white">
                        <p className="pb-1 text-lg font-medium">{t('app')}</p>
                        <div style={{ display: 'flex' }}>
                            <AppleOutlined style={{ fontSize: '30px', cursor: 'pointer' }} className="mr-5" />
                            <FacebookOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
                <div className="grid justify-center pt-6 lg:justify-between text-white">
                    <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                        <span>©2021 {t('copyright')}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
