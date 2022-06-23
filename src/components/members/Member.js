import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { FILE_URL } from "../../config";

// Member component
const Member = () => {
  // declare state variables

  const [users, setUsers] = useState([]);

  // get users from api

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
  // calling getAllUsers function

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="member text-light">
      <h5 className="text-left fw-bold mb-4">Contacts</h5>
      {users.map((user) => (
        <li className="sidebarFriend" key={user.id} user={user}>
          {!user.image ? (
            <i className="bi bi-person-circle size"></i>
          ) : (
            <img
              className="sidebarFriendImg"
              src={FILE_URL + user.image}
              alt="user"
            />
          )}
          <span className="text-light fw-light member-text">{user.name}</span>
        </li>
      ))}
    </div>
  );
};

export default Member;
