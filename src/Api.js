const BASE_URL = 'https://dummyjson.com'; 

// Function to fetch posts from the API
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching posts: ' + error.message);
  }
};

// Function to fetch an individual post by ID from the API
export const fetchPostById = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching post: ' + error.message);
  }
};

// Function to fetch comments for a post from the API
export const fetchCommentsForPost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching comments: ' + error.message);
  }
};
