import React, { useState, useEffect } from "react";

function NewPost({ users, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreatePost = async () => {
    // Check if all required fields are filled
    if (!title || !body || !tags || !selectedUser) {
      alert("Please fill in all fields.");
      return;
    }

    const post = {
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()),
      userId: selectedUser.id,
      // You may need to add reactions or other properties here
    };

    // Send a POST request to the API to create a new post
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();

        // Update the local state with the newly created post
        onPostCreated(data);
        
        // Clear the form fields
        setTitle("");
        setBody("");
        setTags("");
        setSelectedUser(null);
      } else {
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="new-post">
      <h2>Create a New Post</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content (Body):</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <label>Select User:</label>
          <select value={selectedUser ? selectedUser.id : ""} onChange={(e) => {
            const userId = e.target.value;
            setSelectedUser(users.find((user) => user.id === userId));
          }}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleCreatePost}>Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
