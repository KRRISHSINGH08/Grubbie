import { Link } from "react-router"
import { Location } from "../Location"
import logoImage from "../../public/Assets/logo.png"

const HeaderLogo = () => {
    <div className="logo-container flex ml-20 items-center">
        <Link to={'/'} >
        <img className="w-40 mx-36 rounded-full" src={logoImage} alt="Restaurant logo" loading="lazy"/>
        </Link>
        <Location />
    </div>
}
export default HeaderLogo;