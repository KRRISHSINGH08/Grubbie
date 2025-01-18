import { useEffect, useState } from "react";
import RestrauntCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import {generateRestaurantURL} from "../utils/constant";
import { useSelector } from "react-redux";
import { MenuCard } from "./MenuCard";
import { useRestaurants } from "../utils/useRestaurants";

const Body = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const {latitude, longitude} = useSelector((state) => state.location);
  const filterOptions = ['Rating 4.0+', 'Rs. 300-Rs. 600', 'Offers' , 'Less than Rs. 300'];
  const [activeFilterIndex, setActiveFilterIndex] = useState();
  const {restaurants, setRestaurants}  = useRestaurants(latitude, longitude);
  const { list: listOfRestaurants, filtered: filteredRestaurants, menu: menuData, headers } = restaurants;

  const filterRestaurants = (index) => {
     // Apply the selected filter
     let filteredList = [];

     switch (index) {
       case 0: // Rating 4.0+
         filteredList = listOfRestaurants.filter(
           (res) => res?.info?.avgRating > 4
         );
         break;
       case 1: // Rs. 300-Rs. 600
         filteredList = listOfRestaurants.filter((res) => {
           const costForTwo = parseFloat(
             res?.info?.costForTwo.split(" ")[0].slice(1) / 2
           );
           return costForTwo >= 300 && costForTwo <= 600;
         });
         break;
       case 2: // Offers
         filteredList = listOfRestaurants.filter(
           (res) => res?.info?.aggregatedDiscountInfoV3?.header
         );
         break;
       case 3: // Less than Rs. 300
         filteredList = listOfRestaurants.filter((res) => {
           const costForTwo = parseFloat(
             res?.info?.costForTwo.split(" ")[0].slice(1) / 2
           );
           return costForTwo < 300;
         });
         break;
       default:
        filteredList = listOfRestaurants;
     }
     setRestaurants((prev) => ({...prev, filtered: activeFilterIndex === index ? listOfRestaurants : filteredList}))
     setActiveFilterIndex(activeFilterIndex == index ? null : index);
  }

  const handleSearch = () => {
    const filteredList = listOfRestaurants.filter((res) =>
      res?.info?.name.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setRestaurants((prev) => ({ ...prev, filtered: filteredList }));
  }

  if (!listOfRestaurants.length) return <Shimmer />;

  return (
    <div className="Body w-10/12 m-auto">

      <MenuCard title={menuData?.header?.title} card={'dishes'} data = {menuData}/>
      
    <hr className="w-full h-2 my-10" />


      <MenuCard title={headers.top} card={'restaurant'} data = {listOfRestaurants}/>


     <hr className="w-full h-2 my-10" />
      <h2 className="font-[700] text-2xl mt-6 ml-6"> {headers.featured} </h2>
      <div className="flex">
        <div className="m-4 mr-0 p-4 pr-0">
          <input
            className="border border-solid border-black p-2 rounded-md"
            placeholder="Search"
            type="text"
            value={searchTxt}
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
          />
          <button
            className="mx-4 bg-green-200 px-4 py-2 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="p-4 flex items-center gap-2">
          {filterOptions.map((btn, index) => (
             <button key={index} className={`px-6 py-2 rounded-full border border-gray-400 ${activeFilterIndex === index && 'bg-orange-400'}`} onClick={() => filterRestaurants(index)}> {btn} </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map((restraunt) => {
 
        const fullPath = restraunt?.cta?.link?.split("/city/")[1];  
          return(
          <Link
          to={`/restaurantMenu/${fullPath}`}
          key={restraunt?.info?.id}>
            <RestrauntCard resData={restraunt} />
          </Link>
        )})
      }
      </div>
    </div>
  );
};
export default Body;
