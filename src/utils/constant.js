// Base URLs for media and assets
export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/"
export const LOADER_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"

// API Base URL with CORS Proxy
const CORS_PROXY = "https://cors-by-codethread-for-swiggy.vercel.app/cors";
const BASE_API_URL = `${CORS_PROXY}/dapi`;

// Dynamic URL Generators
export const generateMenuURL = (lat, lng, resId) => `${BASE_API_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`
export const generateRestaurantURL = (lat, lng) => `${BASE_API_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
export const generateLocationSuggestionsURL = (location) => `${BASE_API_URL}/misc/place-autocomplete?input=${encodeURIComponent(location)}`
export const generateLocationURL = (place_id) => `${BASE_API_URL}/misc/address-recommend?place_id=${place_id}`