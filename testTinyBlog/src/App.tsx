import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.css'; // Import CSS file for styling

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="container">
      <h1 className="heading">Blogr</h1>
      <select className="select" value={selectedTag} onChange={handleTagChange}>
        <option value="">All</option>
        <option value="mystery">Mystery</option>
        <option value="american">American</option>
        <option value="history">History</option>
        <option value="love">Love</option>
        <option value="french">French</option>
      </select>
      <div className="post-list">
        {filteredPosts.map(post => (
          <div className="post-card" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <div className="tags">
              Tags:
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPosts;
