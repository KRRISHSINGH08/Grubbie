import React, { useState } from 'react'
import { CDN_URL} from '../utils/constant'
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ItemList = ({items}) => {

  const [isPopupVisible, setIsPopUpVisible] = useState([]);
  const [popupItems, setpopupItems] = useState([]);
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));   
    
    setpopupItems((prevItems)=> [...prevItems, item]);
    setIsPopUpVisible((prevItems) => [...prevItems, true]);

    setTimeout(() => {
      setIsPopUpVisible((prevItems) => prevItems.slice(1));
      setpopupItems((prevItems) => prevItems.slice(1)); // remove 1st item
    }, 3000)
  };

  return (
    <div>
        {items.map((item) => (
        <div key={item.card.info.id} data-testid="foodItems" className="flex">

          <div className="mb-10 mr-6 relative w-[700px]" >
            <p className="font-bold text-lg">{item.card.info.name}</p>
            <p className="font-semibold">₹{item.card.info.defaultPrice / 100 || item.card.info.price / 100}</p>
            <span> {item.card.info.ratings.aggregatedRating.rating} </span>
            <span> ({item.card.info.ratings.aggregatedRating.ratingCountV2}) </span>
            <div className="flex flex-wrap">
            <p className="pb-10 border-solid border-black border-opacity-20 border-b-2">{item.card.info.description}</p>
            </div>
          </div>

          <div >
          <div className='relative'>
          <img className="rounded-lg ml-2 w-[180px]" src={CDN_URL + item.card.info.imageId} />
          <button 
              className='p-2 rounded bg-white text-green-600 font-bold shadow absolute right-8 bottom-0'
              onClick={() => handleAddItem(item)}
          >Add +
          </button>
          </div>
          </div> 

          </div>
            ))}

            {/* Popup */}
            {isPopupVisible && (
              <div className='fixed top-10 left-1/2 transform -translate-x-1/2 text-black w-[300px] text-md'> 
                {popupItems.map((item) => (
                  <div className='flex items-center bg-white space-x-4 mb-5 shadow-lg p-4 rounded-md'>
                  {/* <svg viewBox="0 0 24 24" className='bg-green-300 rounded-full' width="10%" height="10%" ><path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path></svg> */}
                  <img src='https://cdn-icons-png.freepik.com/256/9426/9426997.png?ga=GA1.1.1847700044.1736979197&semt=ais_hybrid' className='w-5' />
                  <p className=''>
                    {item.card.info.name + ' has been added to your cart!!'}
                  </p>
                </div>
                ))}
                </div>
            )}
    </div>
  );
};

export default ItemList