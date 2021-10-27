import axios from "axios";

const API_KEY = "6e1192c7c733465aaf9d32ed8caec88a"; //"4d3276d815b240cdb891033cc171991d";
export class NewsService {
       
    getNews = (topic="movie", language="en") => {
        return axios({
            url: `https://newsapi.org/v2/everything?q=${topic}&language=${language}&pageSize=24&apiKey=${API_KEY}`,
            method: 'GET'
        })
    }
}

export const newsService = new NewsService();