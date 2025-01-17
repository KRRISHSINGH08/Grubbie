import { useDispatch} from "react-redux";
import { setLatitude, setLongitude } from "../utils/locationSlice";
import { generateLocationURL } from "../utils/constant";

export const LocationSidebar = ({location, setLocationDetails, handleInputChange, data, isOpen, toggleLocation}) => {
  
    const dispatch = useDispatch();

        const handleClick = async(item) => {
            try {
                const response = await fetch(generateLocationURL(item.place_id))
                const result = await response.json();

                const lat = result.data[0].geometry.location.lat;
                const lng = result.data[0].geometry.location.lng;

                dispatch(setLatitude(lat));
                dispatch(setLongitude(lng));
                
                setLocationDetails(item.description.split(','));
                toggleLocation();
            } catch (error) {
                console.error(error);
            } 
        }

    return (
            <div className={`overflow-y-scroll z-10 fixed top-0 left-0 w-[35%] h-full bg-white text-center p-4 transform ${isOpen? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    
                    <div className="w-[80%] ml-14 mt-8">

                    <div className="flex justify-start">
                    <button className="mb-4 opacity-55 text-lg cursor-pointer" onClick={toggleLocation} aria-label="Close Sidebar">X</button>
                    </div>

                    <div className="relative">
                    <input type="text" placeholder="Search for area, Street name" value={location} onChange={(e) => handleInputChange(e.target.value)} className="shadow-md border p-4 rounded-sm w-full"/>
                    <span onClick={() => handleInputChange('')} className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-red-500"> Cancel </span>
                    </div>

                    <div className="m-2 p-2">
                    <ul>
                    {location && data.map((item) => (
                        <li className='m-2 p-2' key={item.place_id}>
                            <div className="flex items-center">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-2xl mr-2 flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin ="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></path><circle cx="256" cy="192" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle></svg>
                            <div className="mx-auto"> 
                                <p onClick={() => handleClick(item)} className="hover:text-orange-400 cursor-pointer">{item.description.split(',')[0]}</p>
                                <p className="text-sm opacity-55">{item.description.split(',').slice(1).join(',')}</p>
                            </div>
                            </div>
                            <hr className="mt-3 border-dotted" />
                        </li>
                    ))}
                    </ul>
                   </div>

            </div>
            </div>
    )
}