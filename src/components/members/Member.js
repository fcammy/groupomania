import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { FILE_URL } from "../../config";

const Member = () => {
  const [users, setUsers] = useState([]);

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
    <div className="member text-light">
      <h5 className="text-left fw-bold mb-4">Contacts</h5>
      {users.map((user) => (
        <li className="sidebarFriend" key={user.id} user={user}>
          <img
            className="sidebarFriendImg"
            src={FILE_URL + user.image}
            alt="user"
          />
          <span className="text-light fw-light member-text">{user.name}</span>
        </li>
      ))}
    </div>
  );
};

export default Member;
