import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Calendar, Clock, ArrowRight, X, 
  Share2, Check, Sparkles, User, ChevronRight, CheckCircle2, 
  Bookmark, ArrowUpRight, MessageSquare, GraduationCap 
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '../data/blogData';

interface BlogViewProps {
  setCurrentView: (view: string) => void;
  onSelectCourseById?: (courseId: string) => void;
  onOpenSpeakingEnquiry?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ 
  setCurrentView, 
  onSelectCourseById,
  onOpenSpeakingEnquiry 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.keyTakeaways.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleOpenArticle = (post: BlogPost) => {
    setSelectedArticle(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handleCopyArticleLink = (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/#blog-${post.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleActionNavigate = (view?: string, courseId?: string) => {
    if (courseId && onSelectCourseById) {
      onSelectCourseById(courseId);
    } else if (view) {
      setCurrentView(view);
    } else {
      setCurrentView('academy');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-neutral-200 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto space-y-4 mb-12 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3e1a9] text-xs font-cinzel uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Flawless Journal & Insights</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Perspectives on Household Excellence, Career Dignity & Business Stewardship
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base text-neutral-300 font-serif leading-relaxed">
          Thought leadership, industry observations, and practical guidance drawn from more than 16 years of hands-on experience in private household solutions and entrepreneurial advisory.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full bg-[#13131a] border border-neutral-700/80 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-lg shadow-black/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-neutral-800 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs">
          {BLOG_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#14141c] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Article (Shown when no search query and category is All) */}
      {!searchQuery && activeCategory === 'All' && featuredPost && (
        <div className="max-w-6xl mx-auto mb-16">
          <div 
            onClick={() => handleOpenArticle(featuredPost)}
            className="group cursor-pointer rounded-2xl bg-[#0f0f15] border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-neutral-900">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-transparent to-transparent lg:hidden"></div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[#f3e1a9] text-[10px] font-cinzel uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Featured Perspective</span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[10px] font-cinzel">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#f3e1a9] transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost.author.image} 
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/40"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800">
          <div className="text-xs font-cinzel uppercase tracking-wider text-neutral-400 font-semibold">
            {activeCategory === 'All' ? 'All Publications & Essays' : `${activeCategory} Articles`} ({filteredArticles.length})
          </div>
          {searchQuery && (
            <div className="text-xs text-[#d4af37]">
              Matching "{searchQuery}"
            </div>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-[#111117] border border-neutral-800 rounded-2xl p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="font-cinzel text-lg font-bold text-white">No articles found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn't find any articles matching your search criteria. Try a different keyword or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-2 text-xs text-[#d4af37] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(post => (
              <article
                key={post.id}
                onClick={() => handleOpenArticle(post)}
                className="group cursor-pointer rounded-xl bg-[#0f0f15] border border-neutral-800/80 hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/60"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-neutral-900">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-neutral-700 text-[10px] font-cinzel text-[#f3e1a9]">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                      <span>{post.publishedDate}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#f3e1a9] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 font-serif line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Key Takeaways Preview */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {post.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                        <span 
                          key={tIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#d4af37]" />
                          <span className="line-clamp-1">{takeaway}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-neutral-800/60 mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                    />
                    <span className="text-[11px] text-neutral-300 font-medium line-clamp-1">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-[#d4af37] font-semibold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* FULL ARTICLE MODAL / READER VIEW */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0e0e14] border border-[#d4af37]/40 rounded-2xl shadow-2xl my-auto overflow-hidden">
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-20 bg-[#0e0e14]/95 backdrop-blur-md px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-[#d4af37] font-cinzel font-semibold uppercase tracking-wider text-[10px]">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyArticleLink(selectedArticle)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-[#d4af37]/40 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
                  title="Copy link to this article"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="text-[11px]">Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCloseArticle}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content Container */}
            <div className="p-6 sm:p-10 space-y-8 max-h-[85vh] overflow-y-auto">
              {/* Header Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                <p className="text-base sm:text-lg text-[#f3e1a9] font-serif italic">
                  {selectedArticle.subtitle}
                </p>

                {/* Author Bar */}
                <div className="flex items-center gap-4 pt-2 border-t border-b border-neutral-800 py-3 text-xs">
                  <img 
                    src={selectedArticle.author.image} 
                    alt={selectedArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/40"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {selectedArticle.author.name}
                    </div>
                    <div className="text-neutral-400 text-xs">
                      {selectedArticle.author.role}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      Published {selectedArticle.publishedDate} • Fourways, South Africa
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-xl overflow-hidden border border-neutral-800 h-64 sm:h-80 relative">
                <img 
                  src={selectedArticle.coverImage} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#13131c] to-[#0c0c10] border border-[#d4af37]/30 space-y-3">
                <div className="text-xs font-cinzel font-bold text-[#f3e1a9] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Executive Summary & Key Takeaways</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pull Quote */}
              {selectedArticle.pullQuote && (
                <div className="p-6 rounded-xl bg-[#151520] border-l-4 border-[#d4af37] text-neutral-100 font-serif italic text-base sm:text-lg leading-relaxed shadow-lg">
                  "{selectedArticle.pullQuote}"
                </div>
              )}

              {/* Body Sections */}
              <div className="space-y-8 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                {selectedArticle.contentSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    {section.heading && (
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                        {section.heading}
                      </h3>
                    )}
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Author Bio Card */}
              <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <img 
                  src={selectedArticle.author.image} 
                  alt={selectedArticle.author.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37]"
                />
                <div className="space-y-1">
                  <div className="text-xs uppercase font-cinzel text-[#d4af37] tracking-wider">
                    About the Author
                  </div>
                  <div className="text-sm font-bold text-white">
                    {selectedArticle.author.name}
                  </div>
                  <p className="text-xs text-neutral-400">
                    Leader in professional household education, staffing standardisation, and founder mentorship with over 16 years of practical industry mastery in South Africa.
                  </p>
                </div>
              </div>

              {/* Action Callout Box */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-[#171724] to-[#111119] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-cinzel font-bold text-[#f3e1a9]">
                    Continue Your Journey with Flawless Institution™
                  </div>
                  <div className="text-xs text-neutral-400">
                    Discover practical skills training at Flawless Academy or engage our bespoke household advisory.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleCloseArticle();
                      handleActionNavigate(selectedArticle.relatedView, selectedArticle.relatedCourseId);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-bold text-xs hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md shadow-[#d4af37]/20"
                  >
                    <span>{selectedArticle.ctaText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCloseArticle}
                    className="px-3 py-2.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thought Leadership & Speaking Enquiry Prompt */}
      <div className="max-w-6xl mx-auto mt-16 p-8 rounded-2xl bg-[#0f0f15] border border-[#d4af37]/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-cinzel font-bold text-[#d4af37] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thought Leadership & Keynotes</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Invite Teldah Siyawamwaya to Address Your Conference or Masterclass
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Founder Teldah delivers inspiring, high-impact sessions on household excellence, female entrepreneurship, business growth, and operating with faith.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenSpeakingEnquiry ? onOpenSpeakingEnquiry() : setCurrentView('speaking')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Submit Speaking Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('academy')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white font-medium text-xs hover:border-[#d4af37]/50 flex items-center justify-center gap-2 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[#d4af37]" />
              <span>Explore Academy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
