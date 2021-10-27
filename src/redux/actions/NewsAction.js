import { newsService } from "../../services/NewsService";

export const NewsAction = (topic, language) => {
    return async (dispatch) => {
        try {
            const result = await newsService.getNews(topic, language);
            if (result.status === 200) {
                dispatch({
                    type: "LAY_TIN_TUC",
                    tintuc: result.data.articles
                });
            }
            console.log('result', result);
        } catch (error) {
            console.log('error', error);
        }
    }
}