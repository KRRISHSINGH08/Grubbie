import { useEffect, useState } from "react";
import RestrauntCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import {generateRestaurantURL} from "../utils/constant";
import { useSelector } from "react-redux";
import { MenuCard } from "./MenuCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [menuCard, setMenuCard] = useState("");
  const {latitude, longitude} = useSelector((state) => state.location);
  const filterBtn = ['Rating 4.0+', 'Rs. 300-Rs. 600', 'Offers' , 'Less than Rs. 300'];
  const [selectedFilter, setSelectedFilter] = useState();

  const [topRestaurantHeader, setTopRestaurantHeader] = useState()
  const [title, setTitle] = useState();

  useEffect(() => {
    getRestaurants();
  }, [latitude, longitude]);

  const getRestaurants = async () => {

    try{
      const response = await fetch(generateRestaurantURL(latitude, longitude));
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      
      const cardData = json?.data?.cards || [];
      const restaurantsCard = cardData.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      // const restaurants =  cardData[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || cardData[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      const restaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      // setTopRestaurantHeader(cardData[1]?.card?.card?.header?.title || "Top Restaurants")
      // setTitle(cardData[2].card.card.title || "Featured Restaurants");
      setTopRestaurantHeader(cardData.find(card => card?.card?.card?.header)?.card?.card?.header?.title || "Top Restaurants");
      setTitle(cardData.find(card => card?.card?.card?.title)?.card?.card?.title || "Featured Restaurants");

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants); 
      setMenuCard(cardData[0]?.card?.card || {});
    }
    catch(error){
    console.error("Failed to fetch restaurants:", error);
    setListOfRestaurants([]); // Optional fallback
    setFilteredRestaurants([]);
    }
  };

  const filterRestaurants = (index) => {
    if (selectedFilter === index) {
      // Reset the filter when the same button is clicked again
      setFilteredRestaurants(listOfRestaurants);
      setSelectedFilter(null);
    } 
    else {
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
         break;
     }
 
     setFilteredRestaurants(filteredList);
     setSelectedFilter(index);
  }
  }

  const handleSearch = () => {
    const filteredList = listOfRestaurants.filter((res) =>
      res?.info?.name.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setFilteredRestaurants(filteredList);
  }

  if (!listOfRestaurants.length) return <Shimmer />;

  return (
    <div className="Body w-10/12 m-auto">

      <MenuCard title={menuCard?.header?.title} card={'dishes'} data = {menuCard}/>
      
    <hr className="w-full h-2 my-10" />


      <MenuCard title={topRestaurantHeader} card={'restaurant'} data = {listOfRestaurants}/>


     <hr className="w-full h-2 my-10" />
      <h2 className="font-[700] text-2xl mt-6 ml-6"> {title} </h2>
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
          {filterBtn.map((btn, index) => (
             <button key={index} className={`px-6 py-2 rounded-full border border-gray-400 ${selectedFilter === index && 'bg-orange-400'}`} onClick={() => filterRestaurants(index)}> {btn} </button>
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
