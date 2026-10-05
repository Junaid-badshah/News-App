const CACHE_KEY = 'news_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const saveToCache = (key, data) => {
  try {
    const cache = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(cache));
  } catch (err) {
    console.error('Cache save failed:', err);
  }
};

export const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(`${CACHE_KEY}_${key}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Cache read failed:', err);
    return null;
  }
};

export const clearCache = () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(CACHE_KEY))
    .forEach((key) => localStorage.removeItem(key));
};
