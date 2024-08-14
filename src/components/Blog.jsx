// Blog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blogPosts.json') // Ruta relativa al archivo JSON
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  // Función para calcular el tiempo estimado de lectura
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Promedio de palabras leídas por minuto
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Travel Blog</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="blog-post">
            <Link to={`/blog/${post.id}`}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-date">{new Date().toLocaleDateString()}</p>
              <p className="post-summary">{post.content.slice(0, 200)}...</p>
              <p className="post-reading-time">{calculateReadingTime(post.content)}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default Blog;