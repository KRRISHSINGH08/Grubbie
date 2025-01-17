import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Header  from './src/components/Header/Header'
import Body from './src/components/Body'
import Error from './src/components/Error'
import Cart from './src/components/Cart'
import RestrauntMenu from './src/components/RestrauntMenu'
import appStore from './src/utils/appStore'
import { Help } from './src/components/Help'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router"
import { Provider } from 'react-redux'

const AppLayout = () => {
    return (
    <>
    <Provider store={appStore}>
        <Header/>
        <Outlet/>
    </Provider>
    </>
    )
};

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path: '/restaurantMenu/:city/:location',
                element: <RestrauntMenu />
            },
            {
                path: '/Help',
                element: <Help />
            }
        ],
        errorElement: <Error/>
    },
   
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
<RouterProvider router={appRouter} />
    </StrictMode>
)