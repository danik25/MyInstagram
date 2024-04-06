import { NavLink } from "react-router-dom";
import { useState } from "react";
import { userService } from "../services/user.service";
import { OpenMenu } from "./OpenMenu";

export function AppSideBar() {
    const [isOpen, setOpen] = useState(true);
    
  function toggleOpenMenu(newOpen) {
    setOpen(newOpen);
  }
    
  const loggedUser = userService.getLoggedUser();

  const sideBarNav = [
    { path: "home", content: "Home" },
    { path: "search", content: "Search" },
    { path: "explore", content: "Explore" },
    // { path: "reels", content: "Reels" },
    { path: "message", content: "Message" },
    // { path: "notification", content: "notification" },
    { path: "create", content: "create" },
    { path: loggedUser, content: "Profile" },
  ];

  const navs = sideBarNav.map((nav) => (
    <NavLink key={nav.path} to={`${nav.path}`}>
      {nav.content}
    </NavLink>
  ));

  return (
    <div className="app-side-bar">
          <OpenMenu isOpen={isOpen} toggleOpenMenu={toggleOpenMenu} />
      MyInstagram
      {navs}
    </div>
  );
}
