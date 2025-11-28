import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blogPosts.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in pt-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Travel Blog
        </h1>
        <p className="text-lg text-slate-500">
          Historias, consejos e inspiración para tu próxima aventura.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id} 
              className="group bg-white rounded-2xl shadow-soft hover:shadow-float border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
              {/* Imagen Placeholder (opcional, si tuvieras imágenes en el JSON) */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 group-hover:scale-105 transition-transform duration-500"></div>
                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                   Artículo
                 </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                {/* Meta data */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegClock />
                    {post.readingTime}
                  </div>
                </div>

                <h2 className="font-display text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.summary}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                  Leer artículo completo <FaArrowRight className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-400 text-lg">No hay artículos disponibles por ahora.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;