import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from "../Film/Film_Flip";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch, useSelector } from "react-redux";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    />
  );
}


const MultipleRowsSlick = (props) => {

  const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  let activeFilmDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
  let activeFilmSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

  const renderFilms = () => {
    return props.arrFilm.map((item, index) => {
      return <div key={index} className={`${styleSlick['width-item']}`}>
        <Film_Flip item={item} />
      </div>
    })
  }

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div>
      <button className={`${styleSlick[activeFilmDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`} onClick={() => {
        const action = {
          type: SET_FILM_DANG_CHIEU
        }
        dispatch(action);
      }}>PHIM ĐANG CHIẾU</button>
      <button className={`${styleSlick[activeFilmSC]} px-8 py-3 font-semibold rounded border border-gray-800 text-gray-800`} onClick={()=>{
         const action = {
          type: SET_FILM_SAP_CHIEU
        }
        dispatch(action);
      }}>PHIM SẮP CHIẾU</button>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );

}

export default MultipleRowsSlick;