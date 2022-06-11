import { useState } from "react";
import { API_URL } from "../../config";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState("");

  // handle event change
  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const comment = fetch(`${API_URL}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: comments,
            postId: postId,
          }),
        });
        comment.then((res) => res.json());
        const data = await comment.json();
        setComments(data);
      }
    } catch (error) {}
  };

  return (
    <div className="comments">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="comment"
          onChange={handleCommentChange}
          value={comments}
          placeholder="Write a comment"
          className="outline-none "
        />

        <button type="submit" className="send">
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default Comment;
