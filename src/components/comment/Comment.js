import { useState } from "react";
import { API_URL } from "../../config";

const Comment = ({ postId, comments, setComments }) => {
  const [input, setInput] = useState("");

  // handle event change
  const handleCommentChange = (e) => {
    setInput(e.target.value);
  };

  // handle event submit

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (token) {
        let comment = await fetch(`${API_URL}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: input,
            postId: postId,
          }),
        });
        comment = await comment.json();
        setComments([...comments, comment]);
        setInput("");
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
          value={input}
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
