import { useRef } from "react";
import RestrauntCard from "./RestaurantCard";
import { CDN_URL } from "../utils/constant";
import { Link } from "react-router";

export const MenuCard = ({title, card, data}) =>{

  const scrollContainerRef = useRef();
  const scrollLeft =() => {
    if(scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({left:-300, behavior: 'smooth'});
    }
   };
    const scrollRight = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
    return(
        <div>
        <div className="flex justify-between">
        
              <h2 className="font-[700] text-2xl mt-6 ml-6">{title}</h2>
              <div className="flex gap-3 text-2xl cursor-pointer text-gray-700 mt-6 mr-3">
                <div className="hover:text-orange-500" onClick={scrollLeft}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
                </div>
                <div className="hover:text-orange-500" onClick={scrollRight}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path></svg>
                </div>
              </div>
        </div>
        
        {card === 'dishes' ? (
                <div ref={scrollContainerRef} className="flex overflow-hidden ">
                {data?.imageGridCards?.info?.map((type) => (
                <img key={type.id} src={CDN_URL + type.imageId} className="w-40 cursor-pointer" /> ))}
                </div>
             ) : (
        <div ref={scrollContainerRef} className="flex overflow-hidden">
        {data.map((restraunt) => {
            const fullPath = restraunt?.cta?.link?.split("/city/")[1]; 
          return ( 
            <Link
            to={`/restaurantMenu/${fullPath}`}
            key={restraunt?.info?.id} 
            >
            <RestrauntCard resData={restraunt} />
          </Link>
        )})}
        </div>
      )}

        </div>
    )
}