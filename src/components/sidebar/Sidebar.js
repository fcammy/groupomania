import SidebarRow from "./SidebarRow";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { FILE_URL } from "../../config";
import {
  MdRssFeed,
  MdChat,
  MdVideocam,
  MdPeople,
  MdBookmark,
  MdHouse,
  MdEvent,
} from "react-icons/md";

const Sidebar = () => {
  const { profile } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="d-flex mb-3">
        <img
          src={FILE_URL + profile.image}
          alt="profile"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        />
        <div className="mx-3">
          <h6>{profile.name}</h6>
        </div>
      </div>
      <SidebarRow icon={<MdRssFeed />} title="Feed" />
      <SidebarRow icon={<MdChat />} title="Chat" />
      <SidebarRow icon={<MdVideocam />} title="Videos" />
      <SidebarRow icon={<MdPeople />} title="Group" />
      <SidebarRow icon={<MdBookmark />} title="Bookmark" />
      <SidebarRow icon={<MdHouse />} title="Market Place" />
      <SidebarRow icon={<MdEvent />} title="Events" />
    </div>
  );
};

export default Sidebar;
