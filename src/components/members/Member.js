import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { FILE_URL } from "../../config";

const Member = () => {
  const [users, setUsers] = useState([]);
  const { profile } = useContext(AuthContext);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="member">
      <p className="text-center fs-4">Contacts</p>
      {users.map((user) => (
        <li className="sidebarFriend" key={user.id}>
          <img
            className="sidebarFriendImg"
            src={FILE_URL + profile.image}
            alt="user"
          />
          <span className="sidebarFriendName">{user.profile.name}</span>
        </li>
      ))}
    </div>
  );
};

export default Member;
