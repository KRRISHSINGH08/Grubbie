import React from 'react'
import { useRouteError } from 'react-router'
import image from "../public/Assets/error404.png"

const Error = () => {
    const err = useRouteError();
  return (
    <div>
        {/* <h2>Data not found!!</h2> */}
        <img src={require('../public/Assets/error404.png')} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3' />
        {/* <h3>{err.status}: {err.statusText}</h3> */}
    </div>

  )
}

export default Error