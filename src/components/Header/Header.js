import { Link } from "react-router";
import { Location } from "../Location";
import logoImage from "../../public/Assets/logo.png"
import NavMenu from "./NavMenu";

const Header = () => {

  return (
    <header className="h-20 flex justify-between shadow-lg">
        {/* Logo and Location */}
      <div className="flex ml-20 items-center">
        <Link to={'/'} >
        <img className="w-20 mx-6 rounded-full" src={logoImage} alt="Restaurant logo" loading="lazy"/>
        </Link>
        <Location />
      </div>
      {/* Navigation Menu */}
     <NavMenu />
    </header>
  );
};
export default Header;