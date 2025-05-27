import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Blog.css'; // Seguiremos usando un poco de CSS para el contenido del post

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch('/blogPosts.json')
      .then(response => response.json())
      .then(data => {
        const foundPost = data.find(p => p.id === parseInt(id));
        setPost(foundPost);
      })
      .catch(error => console.error('Error fetching blog post:', error));
  }, [id]);

  if (!post) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-accent font-semibold mb-8 transition-colors">
            <FaArrowLeft />
            Back to Blog
          </Link>

          <p className="text-base text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.readingTime} read</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">{post.title}</h1>
          
          {/* Este div tendrá estilos aplicados desde Blog.css */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </div>
      </div>
    </div>
  );
};

export default BlogPost;