import { useContext, useState } from "react";
import { API_URL } from "../config";
import AuthContext from "../context/AuthProvider";

const CreatePost = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");

  const { profile } = useContext(AuthContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
      console.log(image);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!input.length > 5) return window.alert("Insert more text");

      const token = localStorage.getItem("token");

      const post = await fetch(API_URL + "/posts", {
        method: "POST",
        body: JSON.stringify({ text: input, image: image }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      console.log({ data });
      setInput("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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
            disabled={!input}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;