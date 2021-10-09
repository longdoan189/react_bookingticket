import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MultipleRowsSlick from '../../components/ReactSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/types/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import HomeMenu from './HomeMenu/HomeMenu';

export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

    const dispatch = useDispatch();
    console.log('propsHome', arrFilm);

    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);

        dispatch(layDanhSachHeThongRapAction());
    }, [])

    return (
        <div>
            <HomeCarousel />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowsSlick arrFilm={arrFilm} />
                </div>
            </section>
            <div className="mx-8">
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    )
}
