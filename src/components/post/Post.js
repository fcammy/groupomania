import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { FILE_URL } from "../../config";
import ReactTimeAgo from "react-time-ago";
const Post = ({ image, createdAt, text }) => {
  const { profile } = useContext(AuthContext);
  return (
    <div className="post">
      <button
        type="button"
        className="btn-close float-end close-size"
        aria-label="Close"
      ></button>
      <div className="post__top">
        <img
          src={FILE_URL + profile.image}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
          alt=""
          className="post__avatar"
        />
        <div className="post__topInfo">
          <h3>{profile.name}</h3>
          <p>
            <ReactTimeAgo date={createdAt} locale="en-US" timeStyle="twitter" />
          </p>
        </div>
      </div>

      <div className="post__bottom">
        <p>{text}</p>
      </div>

      <div className="post__image">
        <img src={FILE_URL + image} alt="" />
      </div>

      <div className="post__options">
        <div className="post__option">
          <i className="bi bi-hand-thumbs-up-fill"></i>
          <p className="mb-0">Like</p>
        </div>

        <div className="post__option">
          <i className="bi bi-chat-right-fill"></i>
          <p className="mb-0">Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
