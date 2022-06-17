import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

const Comments = ({ comments }) => {
  const { profile } = useContext(AuthContext);
  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className="comments__text">
            <p className="comment__font fw-bold pt-2">{comment.user?.name}</p>
            <p className="pb-2">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
