import { useState, useEffect } from "react";
import { generateRestaurantURL } from "./constant";

export const useRestaurants = (latitude, longitude) => {
    const [restaurants, setRestaurants] = useState({ list: [], filtered: [], menu:{}, headers: {} });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(generateRestaurantURL(latitude, longitude));
          const data = await response.json();

          const cardData = data?.data?.cards || [];
          const restaurantsCard = cardData.find((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          const restaurants = restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

          setRestaurants({
            list: restaurants,
            filtered: restaurants,
            menu: cardData[0]?.card?.card || {},
            headers: {
              top: cardData[1]?.card?.card?.header?.title || "Top Restaurants",
              featured: cardData.find(card => card?.card?.card?.title)?.card?.card?.title || "Featured Restaurants"
            },
          });
        } catch (error) {
          console.error("Failed to fetch restaurants:", error);
          setRestaurants({ list: [], filtered: [], menu: {}, headers: {} });
        }
      };
      fetchData();
    }, [latitude, longitude]);
    // Return both state and updater function
    return { restaurants, setRestaurants };
  };
  