// BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

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
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-link">← Back to Blog</Link>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{new Date().toLocaleDateString()}</p>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default BlogPost;