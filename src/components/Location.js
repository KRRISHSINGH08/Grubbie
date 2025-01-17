import { useEffect, useState } from "react";
import { LocationButton } from "./LocationButton";
import { LocationSidebar } from "./LocationSidebar";
import { generateLocationSuggestionsURL } from "../utils/constant";

export const Location = () => {
    const defaultCity = 'Bangalore';
    const [location, setLocation] = useState(''); // input
    const [data, setData] = useState([]); // locations 
    const [isOpen, setIsOpen] = useState(false); // sidebar
    const [locationDetails, setLocationDetails] = useState([defaultCity]); // selected location detail
    const [error, setError] = useState(null);

    const fetchData = async() => {
        const url = generateLocationSuggestionsURL(location);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result.data);
        setError(null); // Clear any previous error
    }
    catch (err) {
        setError('Failed to fetch location data.');
        console.error(err);
    }
}

    useEffect(() => {
        // logic to fetch data
        if(!location.trim()) return; // Prevent empty API calls.

        // a delay (setTimeout) to prevent API calls on every keystroke.
        const delayBounce = setTimeout(() => {
            fetchData(); 
        }, 300); // Delay an API call by 300ms

        return () => clearTimeout(delayBounce); // Cleanup for debounce

}, [location])

    const handleInputChange = (value) => {
        setLocation(value);
    }

    const toggleLocation = () => {
        setIsOpen(!isOpen);
    }

 // Grouping props into objects
    const locationSidebarProps = {
        location,
        setLocationDetails,
        data,
        handleInputChange,
        isOpen,
        toggleLocation,
    };

    const locationButtonProps = {
        locationDetails,
        toggleLocation
    }

    useEffect(()=> {
         // Logic to handle body overflow
        if(isOpen === true){
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {document.body.style.overflow = ""} // Cleanup on unmount
    }, [isOpen])

    return (
        <div>
            {/* Overlay */}
            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-10 ' onClick={toggleLocation}></div>
            )}
            <LocationButton {...locationButtonProps}/>
            <LocationSidebar {...locationSidebarProps}/>
        </div>        
    )}