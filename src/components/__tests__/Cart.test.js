import { act } from "react"
import {fireEvent, render, screen} from "@testing-library/react"
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import RestaurantMenu from '../RestrauntMenu'
import Cart from '../Cart'
import Header from '../Header'
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import MOCK_DATA from '../mocks/mockResMenu.json'

global.fetch = jest.fn(() =>{
    Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA),
    })
})

test("Should Load Restaurant Menu Component", async() => {
    await act(async() => 
        render(
            <BrowserRouter>
                <Provider store = {appStore}>
                    <Header/>
                    <RestaurantMenu />
                    <Cart />
                </Provider>
            </BrowserRouter>
        )
    );
    const accordionHeader = screen.getByText("Recommended (20)");
    fireEvent.click(accordionHeader);

    // expect(screen.getAllByTestId("foodItems").length).toBe(20)

})