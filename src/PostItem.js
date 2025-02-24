import React, { useEffect, useState } from "react";
import "./PostItem.css";
import { Link } from "react-router-dom";

function PostItem({ post }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    // Fetch the author data for the post
    fetch(`https://dummyjson.com/users/${post.userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Author data:", data); // Check if author data is received
        setAuthor(data);
      });
  }, [post.userId]);

  // Get a portion of the content (max 60 characters)
  const truncatedContent = post.body.length > 60 ? post.body.slice(0, 60) + "..." : post.body;

  return (
    <div className="post-item">
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{truncatedContent}</p>
        <p>Tags: {post.tags.join(", ")}</p>
        {author && <p>Author: {author.firstName} {author.lastName}</p>}
      </div>
    </div>
  );
}

export default PostItem;
