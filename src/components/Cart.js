import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CDN_URL } from '../utils/constant'
import { removeItem } from '../utils/cartSlice'
import { Link } from 'react-router'

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items) 
  const dispatch =  useDispatch();

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeItem({cartItemId}))
  }

  return (
    <div className='w-6/12 mx-auto mt-6 flex flex-col'>
        {cartItems != '' ? cartItems.map((item, index) => ( 
                <div className="flex">
        
                  <div className="mb-10 mr-6 relative w-[700px]" key={item.card.info.id}>
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
                      onClick={() => handleRemoveItem(item.cartItemId)}
                  >Remove
                  </button>
                  </div>
                  </div> 
        
                  </div>
                    )): (
                      <>
                      <img src='https://swiggy2-0-y559.vercel.app/empty.png' className='w-7/12 mx-auto'/>
                      <Link to='/' className='mx-auto w-fit'>
                      <button className='bg-orange-500 text-white p-4 rounded-md mb-4'> See restaurants near you </button>
                      </Link>
                      </>
                    )}
    </div>
  )
}

export default Cart