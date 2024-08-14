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

  return (
    <div className="blog-container">
      <h1 className="blog-title">Travel Blog</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="blog-post">
            <h2 className="post-title">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
            <p className="post-summary">
              {post.summary}
            </p>
            <p className="post-read-time">
              <strong>{post.readingTime}</strong>
            </p>
            <Link to={`/blog/${post.id}`} className="read-full-post">
              Read full post
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