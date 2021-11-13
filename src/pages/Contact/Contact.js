import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const { t, i18n } = useTranslation();

    // Function that displays a success toast on bottom right of the page when form submission is successful
    const toastifyLoading = () => {
        toast(t('sending'), {
            position: 'bottom-left',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback progressing',
            toastId: 'loadingToast'
        });
    };
    const toastifySuccess = () => {
        toast(t('sent'), {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback success',
            toastId: 'notifyToast'
        });
    };

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {
        // Destrcture data object
        const { name, email, subject, message } = data;
        // console.log(name, email, subject, message);
        try {
            const templateParams = {
                name,
                email,
                subject,
                message
            };
            toastifyLoading();
            await emailjs.send(
                "service_wh8j69l",//process.env.REACT_APP_SERVICE_ID,
                "template_5thhm18",//process.env.REACT_APP_TEMPLATE_ID,
                templateParams,
                "user_8BiBJHhPNSfDD9EGOdnpj"//process.env.REACT_APP_USER_ID
            );
            toast.dismiss("loadingToast");
            reset();
            toastifySuccess();
        } catch (e) {
            console.log(e);
        }
    };
    const { userLogin, arrUsers } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = layDanhSachNguoiDungAction();
        dispatch(action);
    }, []);

    let arrAdmins = arrUsers.filter(member => member.maLoaiNguoiDung === "QuanTri")
    arrAdmins = arrAdmins.slice(0, 6);

    return (
        <div className='pt-32 pl-0 sm:pl-16 grid grid-cols-2 gap-2 mb-10'>
            <form className="w-screen sm:w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h1 className='text-3xl text-center'>{t("contact_us_here")}</h1>
                <div className='grid grid-cols-2 gap-4 mt-10 sm:mt-12 lg:mt-0'>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {t('full_name')}
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder={t('full_name')}
                                {...register('name', {
                                    required: { value: true, message: t('required') },
                                    maxLength: {
                                        value: 32,
                                        message: t('full_name_Max')
                                    }
                                })} />
                            {errors.name && <span className='errorMessage text-red-500'>{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {t('email_address')}
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email" type="email"
                                {...register('email', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                })}
                                placeholder={t('email_address')}
                            />
                            {errors.email && (
                                <span className='errorMessage text-red-500'>{t('valid_email')}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            {t('title')}
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type='text'
                            name='subject'
                            {...register('subject', {
                                required: { value: true, message: t('required') },
                                maxLength: {
                                    value: 75,
                                    message: t("lt75c")
                                }
                            })}
                            placeholder={t('subject')} />
                        {errors.subject && (
                            <span className='errorMessage text-red-500'>{errors.subject.message}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            {t('message')}
                        </label>
                        <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"
                            rows={3}
                            name='message'
                            {...register('message', {
                                required: true
                            })}
                            placeholder={t('message')}
                        ></textarea>
                        {errors.message && <span className='errorMessage text-red-500'>{t("required")}</span>}
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-full">
                        <button className="shadow bg-green-400 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full" type="submit">
                            Send
                        </button>
                    </div>
                </div>
            </form>
            <div className="w-11/12 pl-10 hidden sm:block">
                <h1 className='text-3xl text-center'>{t('contact_admin')}</h1>
                <div className="flex flex-col mt-9">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('full_name')}
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {t('email_address')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {arrAdmins.map((object, i) =>
                                            <tr key={i}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img className="h-10 w-10 rounded-full" src={"https://i.pravatar.cc/300/?u=" + i} alt="" />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {object.hoTen}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {object.email}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;