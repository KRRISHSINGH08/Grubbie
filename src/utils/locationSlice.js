import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latitude: '12.9715987',
    longitude: '77.5945627',
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLatitude: (state, action) => {
            state.latitude = action.payload;
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload;
        },
        setLocation: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        }
    }
})

export const {setLatitude, setLongitude, setLocation} = locationSlice.actions;
export default locationSlice.reducer;