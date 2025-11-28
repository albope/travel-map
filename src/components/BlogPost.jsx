import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaRegClock } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blogPosts.json')
      .then(response => response.json())
      .then(data => {
        const foundPost = data.find(p => p.id === parseInt(id));
        setPost(foundPost);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Artículo no encontrado</h2>
        <Link to="/blog" className="text-primary hover:underline mt-4 block">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Botón Volver */}
      <div className="max-w-3xl mx-auto mb-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-50 -ml-4">
          <FaArrowLeft />
          <span>Volver al Blog</span>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Header del Artículo */}
        <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1.5"><FaCalendarAlt /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1.5"><FaRegClock /> {post.readingTime}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Contenido del Artículo */}
        <div className="p-8 md:p-12">
          {/* Estilos 'prose' manuales para contenido HTML inyectado */}
          <div 
            className="prose prose-lg max-w-none text-slate-600 leading-relaxed
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-800 [&>h2]:mt-8 [&>h2]:mb-4
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-6 [&>h3]:mb-3
              [&>p]:mb-6
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6
              [&>li]:mb-2
              [&>a]:text-primary [&>a]:underline [&>a]:font-medium
              [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

    </div>
  );
};

export default BlogPost;