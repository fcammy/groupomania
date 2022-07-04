import { useContext, useState } from "react";
import { API_URL } from "../config";
import AuthContext from "../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// POST COMPONENT
const CreatePost = ({ posts, setPosts }) => {
  // set state for post
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");

  // get auth context
  const { profile } = useContext(AuthContext);

  // setting toast alert

  const postAlert = () => {
    toast.success("Post added successfully !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // handle event change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // handle image upload
  const handleImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      let image = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      image = await image.json();
      setImage(image.filename);

      //console.log(image);
    } catch (error) {
      console.log({ error });
    }
  };

  // handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const post = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: input,
            image: image,
            // userId: profile.id,
          }),
        });
        const data = await post.json();
        setPosts([data, ...posts]);

        //console.log(data);
        setInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="panel">
        <form
          onSubmit={handleSubmit}
          className="d-flex mt-4 flex-column align-items-center card-body"
        >
          <textarea
            className="form-control row-cols-sm-2 bg-light p-text-area"
            name="input"
            value={input}
            onChange={handleChange}
            type="text"
            placeholder={`What's on your mind, ${profile.name}?`}
          />
          <div className="input-group d-flex justify-content-between mt-2 align-items-center">
            <label>
              <span>
                <i className="bi bi-camera-fill icon-size">
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImage}
                  />
                </i>
              </span>
            </label>

            <button
              className=" btn btn-post btn-primary"
              disabled={input.length < 5}
              type="submit"
              onClick={postAlert}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
