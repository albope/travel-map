import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blogPosts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Travel Blog</h1>
            <p className="text-lg text-gray-600 mb-12">
                Tips, stories, and inspiration for your next adventure around the globe.
            </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block bg-white rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2">
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.readingTime} read</p>
                  <h2 className="font-display text-2xl font-bold text-text-main mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                  <span className="font-semibold text-accent group-hover:underline flex items-center gap-2">
                    Read more <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blog posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;