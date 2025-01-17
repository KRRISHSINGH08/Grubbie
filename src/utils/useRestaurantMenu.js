import { useEffect, useState } from "react";
import { generateMenuURL } from "./constant"; 
import { useSelector } from "react-redux";
const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null)
    const {latitude, longitude} = useSelector((state) => state.location);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        const data = await fetch(generateMenuURL(latitude, longitude, resId));
        const json = await data.json();
        setResInfo(json); 
      };
      return resInfo;
}

export default useRestaurantMenu;