const SidebarRow = ({ icon, title }) => {
  return (
    <div className="sidebarRow">
      <span>{icon}</span>
      <h5>{title}</h5>
    </div>
  );
};

export default SidebarRow;
