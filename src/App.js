import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import your CSS file
import SideNav from './SideNav'; // Import your SideNav component
import Main from './Main'; // Import your Main component
import Header from './Header'; // Import your Header component
import Posts from './Posts'; // Import your Posts component
import SinglePost from './SinglePost'; // Import your SinglePost component
import NewPost from './NewPost'; // Import your NewPost component
import RightSidebar from './RightSidebar';

function App() {
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [users, setUsers] = useState([]); // Initialize users state

  useEffect(() => {
    // Fetch users' data from the API
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        // Set the users state with fetched data
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <Router>
      <div className="App container">
        <SideNav />
        <Main>
          <Header />
          <button onClick={() => setShowNewPostForm(true)}>Create New Post</button>
          {showNewPostForm && <NewPost users={users} />} {/* Pass the users prop */}
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/post/:postId" element={<SinglePost />} />
          </Routes>
        </Main>
        <RightSidebar />
      </div>
    </Router>
  );
}

export default App;
