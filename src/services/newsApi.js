import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const PAGE_SIZE = 12;

export const fetchTopHeadlines = async (page = 1, category = 'general') => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      category,
      page,
      pageSize: PAGE_SIZE,
      apiKey: API_KEY,
    },
  });
  return response.data;
};

export const searchNews = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: query,
      page,
      pageSize: PAGE_SIZE,
      sortBy: 'publishedAt',
      apiKey: API_KEY,
    },
  });
  return response.data;
};

export { PAGE_SIZE };
