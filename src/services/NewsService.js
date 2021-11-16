import axios from "axios";

const API_KEY = "a8095b4662e99bb628d77eb6b78d9bdc"; 
export class NewsService {

    getNews = (topic = "movie", language = "en") => {
        return axios({
            url: `https://gnews.io/api/v4/search?q=movie&lang=${language}&token=${API_KEY}`,
            method: 'GET'
        })
    }
}

export const newsService = new NewsService();