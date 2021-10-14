import React from 'react';
import { history } from '../../App';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export default function Register(props) {

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        taiKhoan: Yup.string().required(t("required")),
        email:Yup.string().required(t("required")).email(t("valid_email")),
        matKhau: Yup.string().required(t("required")).min(8,t("pwlt8")),
        matKhauXacNhan: Yup.string().required(t("required")).oneOf([Yup.ref('matKhau'), null], t("match_password")),
        soDt: Yup.string().required(t("required")).matches(/^[0-9]*$/,t("valid_number")),
        hoTen: Yup.string().required(t("required")).matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ -]*$/, t("only_character"))
    })
    const {handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            "taiKhoan": "",
            "matKhau": "",
            "email": "",
            "soDt": "",
            "maNhom": "",
            "hoTen": ""
          },
        validationSchema,
        onSubmit: values => {
            const action = dangKyAction(values);
            dispatch(action);
        }
    });


    return (
        <form onSubmit={handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div className="cursor-pointer flex items-center">
                    <div>
                        <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold" onClick={()=>{
                        history.push('/home');
                    }}>CYBERLEARN</div>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">{t('signup')}</h2>
                <div className="mt-12">
                    <div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">{t('username')}</div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type  placeholder='username' name="taiKhoan" onChange={handleChange}/>
                            {errors.taiKhoan ? errors.taiKhoan: null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t('email_address')}
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="email@example.com" name="email" onChange={handleChange} />
                            {errors.email ? errors.email: null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t('password')}
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder={`${t('enterpassword')}`} name="matKhau" onChange={handleChange}/>
                            {errors.matKhau ? errors.matKhau: null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t('retype_password')}
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder={`${t('enterpassword')}`} name="matKhauXacNhan" onChange={handleChange}/>
                            {errors.matKhauXacNhan ? errors.matKhauXacNhan: null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t('full_name')}
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Joe Smith" name="hoTen" onChange={handleChange} />
                            {errors.hoTen ? errors.hoTen: null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t('phone_number')}
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="0123456" name="soDt" onChange={handleChange} />
                            {errors.soDt ? errors.soDt: null}
                        </div>
                        <div className="mt-10">
                            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg" type="submit">
                                {t('signup')}
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        {t('have_account')} <NavLink to="/login" className="cursor-pointer text-indigo-600 hover:text-indigo-800">{t('signin')}</NavLink>
                    </div>
                </div>
            </div>
        </form>
    )
}
