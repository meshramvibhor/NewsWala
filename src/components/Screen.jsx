import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Globe, Smartphone, Heart, Briefcase, Trophy, Zap, Newspaper, Activity } from 'lucide-react';

const newsCategories = [
  { id: 'general', name: 'General', icon: Newspaper, color: '#3B82F6' },
  { id: 'world', name: 'World', icon: Globe, color: '#10B981' },
  { id: 'business', name: 'Business', icon: Briefcase, color: '#F59E0B' },
  { id: 'technology', name: 'Technology', icon: Smartphone, color: '#8B5CF6' },
  { id: 'entertainment', name: 'Entertainment', icon: Zap, color: '#EC4899' },
  { id: 'health', name: 'Health', icon: Heart, color: '#EF4444' },
  { id: 'science', name: 'Science', icon: Activity, color: '#06B6D4' },
  { id: 'sports', name: 'Sports', icon: Trophy, color: '#10B981' },
];

// API Configuration
const API_KEY = "e31cfd107f26478da9c07fcde8e26ae2";
const PAGE_SIZE = 12; // Increased from 6 to get more news items

const Screen = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (category, pageNum = 1, append = false) => {
    setLoading(true);
    try {
      // For "world" category, we'll use general category without country filter
      let url;
      if (category === 'world') {
        url = `https://newsapi.org/v2/top-headlines?category=general&pageSize=${PAGE_SIZE}&page=${pageNum}&apiKey=${API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${PAGE_SIZE}&page=${pageNum}&apiKey=${API_KEY}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'ok') {
        if (append) {
          setArticles(prev => [...prev, ...(data.articles || [])]);
        } else {
          setArticles(data.articles || []);
        }
        setTotalResults(data.totalResults || 0);
        setHasMore(articles.length + (data.articles?.length || 0) < (data.totalResults || 0));
      } else {
        console.error('API Error:', data.message);
        if (!append) {
          setArticles([]);
          setTotalResults(0);
        }
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      if (!append) {
        setArticles([]);
        setTotalResults(0);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchNews(activeCategory, 1, false);
  }, [activeCategory]);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(activeCategory, nextPage, true);
    }
  };

  const currentNews = articles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-emerald-200/50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
                NewsFlow
              </h1>
            </div>
            
            <div className="relative max-w-md w-full mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-40 backdrop-blur-xl bg-white/90 border-b border-emerald-200/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto scrollbar-hide">
            {newsCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-pink-500 text-white shadow-lg'
                      : 'bg-emerald-100/50 text-emerald-700 hover:bg-pink-200/50 hover:text-pink-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-m font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
            {newsCategories.find(cat => cat.id === activeCategory)?.name} News
          </h2>
          <p className="text-gray-600">
            Stay updated with the latest {activeCategory} headlines
            {!loading && totalResults > 0 && (
              <span className="ml-2 text-emerald-600 font-medium">
                • {totalResults.toLocaleString()} articles available
              </span>
            )}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-emerald-200/50 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            currentNews.map((article, index) => (
              <article
                key={article.url || index}
                className="group bg-white rounded-2xl shadow-sm border border-emerald-200/50 overflow-hidden hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.urlToImage || "https://images.news18.com/ibnlive/uploads/2022/01/titan_eyex-164171739216x9.jpg"}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.news18.com/ibnlive/uploads/2022/01/titan_eyex-164171739216x9.jpg";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      {article.source?.name || activeCategory}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-pink-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                    {article.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Unknown date"}
                    </span>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-transparent bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text hover:from-pink-600 hover:to-emerald-600 text-sm font-semibold transition-all duration-300 hover:scale-110 transform"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

                 {/* Empty State */}
         {currentNews.length === 0 && !loading && (
           <div className="text-center py-16">
             <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <Search className="w-10 h-10 text-emerald-400" />
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2 bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent">
               No news found
             </h3>
             <p className="text-gray-600">
               Try selecting a different category or check back later for updates.
             </p>
           </div>
         )}

         {/* Load More Button */}
         {hasMore && currentNews.length > 0 && (
           <div className="text-center mt-8">
             <button
               onClick={loadMore}
               disabled={loading}
               className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {loading ? 'Loading...' : `Load More (${currentNews.length}/${totalResults})`}
             </button>
           </div>
         )}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group">
        <TrendingUp className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default Screen;