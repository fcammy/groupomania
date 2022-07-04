import { useState, useEffect } from "react";
import CreatePost from "../CreatePost";
import Post from "../post/Post";
import { API_URL } from "../../config";

const Feed = () => {
  // set state for posts
  const [posts, setPosts] = useState([]);

  // getting token from local storage

  const token = localStorage.getItem("token");

  // fetching posts from api

  const fetchPost = async () => {
    const response = await fetch(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  // handle delete post

  const handleDelete = (postId) => {
    const newPosts = posts.filter((post) => post.id !== postId);

    setPosts(newPosts);
  };

  return (
    <div className="feed">
      <CreatePost posts={posts} setPosts={setPosts} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          fetchPost={fetchPost}
          deletePost={handleDelete}
        />
      ))}
    </div>
  );
};

export default Feed;
