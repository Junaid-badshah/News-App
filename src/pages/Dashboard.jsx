import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import { fetchTopHeadlines, searchNews, PAGE_SIZE } from '../services/newsApi';
import { saveToCache, getFromCache } from '../utils/storage';

const CATEGORIES = ['general', 'business', 'technology', 'sports', 'health', 'entertainment', 'science'];

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState('general');
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadNews();
  }, [page, category, searchQuery]);

  const loadNews = async () => {
    setError('');
    const cacheKey = searchQuery ? `search_${searchQuery}_${page}` : `${category}_${page}`;

    const cached = getFromCache(cacheKey);
    if (cached) {
      setArticles(cached.articles || []);
      setTotalResults(cached.totalResults || 0);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = searchQuery
        ? await searchNews(searchQuery, page)
        : await fetchTopHeadlines(page, category);

      const articles = data.articles || [];
      const totalResults = data.totalResults || 0;

      setArticles(articles);
      setTotalResults(totalResults);
      saveToCache(cacheKey, { articles, totalResults });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(search.trim());
  };

  const handleCategory = (cat) => {
    setPage(1);
    setSearch('');
    setSearchQuery('');
    setCategory(cat);
  };

  const totalPages = Math.min(Math.ceil(totalResults / PAGE_SIZE), 10);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">Latest News</h1>
          <p className="text-slate-600 dark:text-slate-400">Stay updated with the latest headlines</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearch(''); setSearchQuery(''); setPage(1); }}
                className="px-4 py-2.5 rounded-lg bg-slate-200 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 dark:hover:bg-neutral-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {!searchQuery && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <NewsCard key={`${page}-${i}`} article={article} index={i} />
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
