import { NavLink } from "react-router-dom";

export function AppSideBar() {
  const sideBarNav = [
    { path: "Home" },
    { path: "Search" },
    { path: "Explore" },
    { path: "Reels" },
    { path: "Message" },
    { path: "Notification" },
    { path: "Create" },
    { path: "Profile" },
  ];

  const navs = sideBarNav.map((nav) => (
    <NavLink key={nav.path} to={`${nav.path.toLowerCase()}`}>
      {nav.path}
    </NavLink>
  ));

  return (
    <div className="app-side-bar">
      MyInstagram
      {navs}
    </div>
  );
}
