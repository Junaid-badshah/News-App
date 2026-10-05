import { Link } from 'react-router-dom';

export default function NewsCard({ article, index }) {
  const { title, description, urlToImage, source, publishedAt, author } = article;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <Link
      to={`/news/${index}`}
      state={{ article }}
      className="group bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-slate-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="aspect-video bg-slate-100 dark:bg-neutral-900 overflow-hidden">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=No+Image'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-neutral-600 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            {source?.name || 'Unknown'}
          </span>
          <span className="text-xs text-slate-500 dark:text-neutral-500">{formatDate(publishedAt)}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-neutral-400 line-clamp-3 flex-1">
          {description || 'No description available.'}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-neutral-500 truncate">
            {author ? `By ${author}` : 'Unknown author'}
          </span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
