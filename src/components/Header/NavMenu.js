import { Link } from "react-router";
import { OffersIcon, HelpIcon } from "./Icons";
import { Login } from "../Login";
import CartLink from "./CartLink";

const NavMenu = () => {
  const menuItemClass = "flex items-center hover:text-orange-500";

  return (
    <nav className="flex items-center relative right-32">
      <ul className="flex items-center gap-x-20 mr-10 font-medium">
        <li className={menuItemClass}>
          <OffersIcon />
          <Link className="ml-1" to="/offers">Offers</Link>
          <sup className="text-orange-600 text-xs font-semibold ml-1">New</sup>
        </li>
        <li className={menuItemClass}>
          <HelpIcon />
          <Link className="ml-1" to="/help">Help</Link>
        </li>
        <li className={menuItemClass}>
          <Login />
        </li>
        <CartLink />
      </ul>
    </nav>
  );
};

export default NavMenu;
