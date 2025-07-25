import "./SideBar.css";
import avatar from "../../images/avatar.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}
