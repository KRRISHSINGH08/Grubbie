export const LocationButton = ({locationDetails, toggleLocation}) => {
    const formatAddress = (address) => {
        const words = address.split(' ');
        return words.length > 2 ? words.slice(0, 2).join(' ') + '...': address
    }

    return (
            <div className="flex items-center  space-x-5 cursor-pointer hover:text-orange-500" onClick={toggleLocation} >  
            <div className="w-[50%]">
                {
                    locationDetails[0] !== 'Bangalore' ? ( 
                        <div className="flex items-center space-x-2 text-center mr-8">
                        <span className="font-bold text-sm">{formatAddress(locationDetails[0])}</span>
                        <span className="text-sm text-center font-medium opacity-75">{locationDetails[1]}</span>
                        </div>
                    ) : <span className="font-bold text-sm">{locationDetails[0]}</span>
                }
            </div>
            <div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="m-4 text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
            </div>
            </div>
    )
}