import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NewsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article not found</h1>
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { title, description, content, urlToImage, source, publishedAt, author, url } = article;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            {source?.name || 'Unknown'}
          </span>
          <span className="text-sm text-slate-500 dark:text-neutral-500">{formatDate(publishedAt)}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          {title}
        </h1>

        {author && (
          <p className="text-slate-600 dark:text-neutral-400 mb-6">
            By <span className="font-medium">{author}</span>
          </p>
        )}

        {urlToImage && (
          <div className="rounded-xl overflow-hidden mb-8 bg-slate-100 dark:bg-neutral-900">
            <img
              src={urlToImage}
              alt={title}
              className="w-full h-auto"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {description && (
          <p className="text-lg text-slate-700 dark:text-neutral-300 font-medium mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {content && (
          <div className="text-slate-700 dark:text-neutral-300 leading-relaxed mb-8">
            <p>{content.replace(/\[\+\d+ chars\]$/, '')}</p>
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Read Full Article →
          </a>
        )}
      </article>
    </div>
  );
}
