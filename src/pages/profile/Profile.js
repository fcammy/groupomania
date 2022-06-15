import { useState, useEffect } from "react";
import { FILE_URL, API_URL } from "../../config";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setProfile(data);
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(`${API_URL}/users/me/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };
  return (
    <div>
      <div className="wrapper">
        <div className="profile-pic">
          <img src={FILE_URL + profile.image} alt="profile" />
        </div>

        <div className="name">{profile.name}</div>
        <div className="username">{profile.name?.split(" ")[0]}</div>
        <div className="email">{profile.email}</div>
        <div className="about-me">{profile.bio}</div>

        <div className="stats">
          <div className="item followers">
            <span className="num">{profile.count.comments}</span>
            <div className="text">Comments</div>
          </div>
          <div className="item stars">
            <span className="num">622</span>
            <div className="text">Likes</div>
          </div>
          <div className="item following">
            <span className="num">{profile.count.posts}</span>
            <div className="text">Posts</div>
          </div>
        </div>
        <button type="button" className="btn btn-outline-danger text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
