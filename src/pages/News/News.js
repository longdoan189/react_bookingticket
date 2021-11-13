import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NewsAction } from '../../redux/actions/NewsAction';
import { useTranslation } from 'react-i18next';

export default function News(props) {

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NewsAction(t("movie"), t("language_short_name")));
    }, []);

    const { tintuc } = useSelector(state => state.NewsReducer);


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
                <div className="flex flex-wrap w-full mb-4 p-4 mt-5 -left-14 sm:left-0" style={{position:'relative'}}>
                    <div className="w-full mb-6 lg:mb-0" style={{position:'absolute',left:'50%',width:'50%'}}>
                        <h1 className="sm:text-4xl text-5xl font-bold title-font mb-2 text-gray-900">{t('news')}</h1>
                        <div className="h-1 w-20 bg-indigo-500 rounded ml-2" />
                    </div>
                </div>
                <div className="flex flex-wrap -m-4 mt-10 ">
                    {tintuc.map((sample_news, i) =>
                        <div className="xl:w-1/3 md:w-1/2 p-4" key={i}>
                            <div className="bg-white p-6 rounded-lg">
                                <img style={{cursor:'pointer'}} className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6" src={sample_news.urlToImage} onError={(e)=>{e.target.onerror = null; e.target.src="https://picsum.photos/720/400"}} alt="Image Size 720x400" />
                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{sample_news.author}</h3>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{sample_news.title}</h2>
                                <p className="leading-relaxed text-base">{sample_news.description}</p>
                                <button className="p-2 rounded bg-indigo-400">
                                    <a href={sample_news.url} target="_blank" className="text-black">{t("external_link")}</a>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
