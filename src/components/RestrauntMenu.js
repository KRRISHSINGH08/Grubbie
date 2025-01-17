import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL } from "../utils/constant";
import { useState } from "react";
const RestrauntMenu = () => {
  const {location} = useParams();
  const resId = (location.split("rest")[1]);

  const resInfo = useRestaurantMenu(resId); 
  const [showIndex, setShowIndex] = useState(null);
  if (resInfo === null) return <Shimmer />; 
  const {name,avgRating,totalRatingsString,costForTwoMessage,cuisines,areaName,sla} = resInfo?.data?.cards[2]?.card?.card?.info;
  const { tabs } = resInfo?.data?.cards[1]?.card?.card;
  const { offers } = resInfo?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle;
  const { carousel } = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
  // console.log("resInfo", resInfo)
  return (
    <div className="menu">
    <div className="w-[700px] mx-auto mt-6">
      <h2 className="font-bold text-2xl">{name}</h2>
      <div className="flex">
      {tabs?.map(tab => <h3 className="m-2 font-bold text-lg" key={tab?.id}>{tab?.title}</h3>)}
      </div>

      <div className="border border-solid border-black border-opacity-20 rounded-lg  p-6">
        <div className="flex font-bold items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
        <p className="mx-1">{avgRating}</p>
        <p className="mr-3">({totalRatingsString})</p>
        <p className="mr-4">• {costForTwoMessage}</p>
        </div>
        <p className="text-orange-500 underline">{cuisines.join(",")}</p>
        <p className="font-semibold text-sm lowercase mt-2">{sla.slaString}</p>
        <p className="font-semibold text-sm">{areaName}</p>
      </div>

      
      <h3 className="font-bold text-lg mt-6"> Deals for you </h3>
       <div className="flex">
        {offers.map(offer => (
          <div className=" border border-solid border-black border-opacity-20 rounded-lg m-2 p-4" key={offer?.info?.offerIds}>
            <p className="font-bold">{offer.info.header}</p>
            <p> {offer.info.couponCode} </p> 
            </div>
        ))}
      </div>
        </div>

      <div className="w-[700px] mx-auto">
      <h3 className="font-bold text-lg m-2" >Top Picks</h3>
        <div className="flex overflow-auto">
          {carousel?.map((type) => (<img className="m-2 w-[292px]" src={CDN_URL + type?.creativeId} key={type?.dish?.info?.id}/>))}
        </div>
      </div>
      
        {categories?.map((category, index) => (
          <RestaurantCategory data={category?.card?.card}
          key={category?.card?.card?.title}
          showItems = {index === showIndex ? true : false}
          setShowIndex = {() => {
            if(showIndex === index) { 
              setShowIndex(null);
            }
            else
            setShowIndex(index) 
          }} />
        ))}


    </div>
  );
};

export default RestrauntMenu;
