import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from "../Film/Film_Flip";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


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

  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  const { width } = useWindowDimensions();
  let centre_padding = '100px';
  let numSlides = 3;
  if (width < 640) {
    centre_padding = '1px';
    numSlides = 1;
  }
  else if (width < 1024) {
    centre_padding = '50px';
    numSlides = 2;
  }
  else {
    centre_padding = '100px';
    numSlides = 3;
  }
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
    centerPadding: centre_padding,
    slidesToShow: numSlides,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <button className={`${styleSlick[activeFilmDC]} sm:px-8 px-10 py-3 font-semibold rounded bg-green-500 text-white mr-2`} onClick={() => {
          const action = {
            type: SET_FILM_DANG_CHIEU
          }
          dispatch(action);
        }}>{t('playingmovie')}</button>
        <button className={`${styleSlick[activeFilmSC]} px-8 py-3 font-semibold rounded border border-green-500 text-green-500`} onClick={() => {
          const action = {
            type: SET_FILM_SAP_CHIEU
          }
          dispatch(action);
        }}>{t('upcomingmovie')}</button>
      </div>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );
}

export default MultipleRowsSlick;