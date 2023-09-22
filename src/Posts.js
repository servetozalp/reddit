import React, { useEffect, useState } from "react";
import "./Posts.css";
import PostItem from "./PostItem";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the dummy JSON API
    fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Fetched data does not contain an array of posts:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  return (
    <div className="posts">
      {Array.isArray(posts) ? (
        posts.map((post) => (
          // Wrap each post item with a Link component
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostItem post={post} />
          </Link>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default Posts;

