import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NewsAction } from '../../redux/actions/NewsAction';
import { useTranslation } from 'react-i18next';

export default function News(props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(NewsAction(t("movie"),t("language_short_name")));
    }, []);
    const {tintuc} = useSelector(state => state.NewsReducer)
    return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto max-w-7x1">
        <div className="flex flex-wrap w-full mb-4 p-4">
        <div className="w-full mb-6 lg:mb-0">
            <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">{t('news')}</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded" />
        </div>
        </div>
        <div className="flex flex-wrap -m-4">
        {tintuc.map((sample_news, i) => 
            <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="bg-white p-6 rounded-lg">
                    <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6" src={sample_news.urlToImage} alt="Image Size 720x400" />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{sample_news.author}</h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{sample_news.title}</h2>
                    <p className="leading-relaxed text-base">{sample_news.description}</p>
                    <a href={sample_news.url} target="_blank">{t("external_link")}</a>
                </div>
            </div>
        )}
        
        
        </div>
    </div>
    </section>


    )
}
