import axios from "axios";

const API_KEY = "6e1192c7c733465aaf9d32ed8caec88a"; 
export class NewsService {

    getNews = (topic = "movie", language = "en") => {
        return axios({
            url: `https://newsapi.org/v2/everything?q=${topic}&language=${language}&pageSize=24&apiKey=${API_KEY}`,
            method: 'GET'
        })
    }
}

export const newsService = new NewsService();