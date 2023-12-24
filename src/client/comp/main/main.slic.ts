//external dependencies
import { createSlice } from "@reduxjs/toolkit";
//external types dependencies
import type {PayloadAction} from "@reduxjs/toolkit";
//internal dependencies
//internal types dependencies

interface MainState {
  mock: boolean, //using mock data
  location: undefined | {
    lat: number,
    lon: number
  },
}

const initialState: MainState = {
  mock: false,
  location: undefined,
}
export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    //sets user location
    setLocation: (
      state, 
      {payload}: PayloadAction<MainState['location']>
    ) => {
      state.location = payload;
    },
  }
});

export const {
  setLocation,
} = mainSlice.actions;