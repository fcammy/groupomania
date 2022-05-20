import { useState, useEffect } from "react";
import CreatePost from "../CreatePost";
import Post from "../post/Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    const response = await fetch("http://localhost:4000/api/v1/posts", {
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

  return (
    <div className="feed">
      <CreatePost />
      {posts.map((post) => (
        <Post
          key={post.id}
          text={post.text}
          createdAt={post.createdAt}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default Feed;
