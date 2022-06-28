import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { FILE_URL, API_URL } from "../../config";
import ReactTimeAgo from "react-time-ago";
import Comment from "../comment/Comment";
import Comments from "../comment/Comments";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// POST COMPONENT

const Post = ({ post, deletePost }) => {
  // get auth context
  const { profile } = useContext(AuthContext);
  // set state for LIKES

  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(
    !!localStorage.getItem(`post-${post.id}`)
  );

  const [comments, setComments] = useState(post.comments);

  // handle delete post

  const handleDelete = async (postId) => {
    try {
      const post = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await post.json();
      deletePost(postId);

      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };
  // handle toast alert

  const deleteAlert = () => {
    toast.info("Post deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // handle like post

  const handleLike = async (postId) => {
    try {
      const post = await fetch(`${API_URL}/posts/${postId}/likes`, {
        method: "POST",
        body: JSON.stringify({ like: !hasLiked }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await post.json();
      setLikes(hasLiked ? likes - 1 : likes + 1);

      setHasLiked(!hasLiked);
      localStorage.setItem(`post-${postId}`, !hasLiked);
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

  // mark post as read

  const markAsRead = async (postId) => {
    try {
      const post = await fetch(`${API_URL}/posts/${postId}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await post.json();

      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="post">
        {post.userId === profile.userId && (
          <button
            type="button"
            className="btn-close float-end close-size"
            aria-label="Close"
            onClick={() => {
              handleDelete(post.id);
              deleteAlert();
            }}
          />
        )}
        {post.userId !== profile.userId && (
          <button onClick={() => markAsRead(post.id)} className="btn btn-info">
            Mark as read
          </button>
        )}
        <div className="post__top">
          <img
            src={FILE_URL + post.user?.image}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
            alt=""
            className="post__avatar"
          />
          <div className="post__topInfo">
            <h3>{post.user?.name}</h3>
            <p>
              <ReactTimeAgo
                date={post.createdAt}
                locale="en-US"
                timeStyle="twitter"
              />
            </p>
          </div>
        </div>

        <div className="post__bottom">
          <p>{post.text}</p>
        </div>

        <div className="post__image">
          <img src={FILE_URL + post.image} alt="" />
        </div>

        <div className="post__options">
          <div className="d-flex justify-content-between border-bottom">
            <i className="bi bi-hand-thumbs-up-fill">{likes}</i>
            <p>{comments?.length} comments</p>
          </div>
          <div className="d-flex justify-content-around border-bottom">
            <span
              className="post__option"
              id="like"
              onClick={() => handleLike(post.id)}
            >
              <i className="bi bi-hand-thumbs-up-fill"></i>
              <p className="mb-0">Like</p>
            </span>

            <div className="post__option">
              <i className="bi bi-chat-right-fill"></i>
              <p className="mb-0">Comment</p>
            </div>
          </div>
        </div>
        <Comment
          postId={post.id}
          comments={comments}
          setComments={setComments}
        />
        <Comments comments={comments} />
      </div>
    </>
  );
};

export default Post;
