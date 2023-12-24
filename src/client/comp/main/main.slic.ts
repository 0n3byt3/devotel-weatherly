//external dependencies
import { createSlice } from "@reduxjs/toolkit";
//external types dependencies
import type {PayloadAction} from "@reduxjs/toolkit";
//internal dependencies
//internal types dependencies

interface MainState {
  mock: boolean; //using mock data
  unit: 'c' | 'f';
  location: undefined | {
    lat: number,
    lon: number
  },
}

const initialState: MainState = {
  mock: false,
  unit: 'c',
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
    //sets temp unit
    setUnit: (
      state, 
      {payload}: PayloadAction<MainState['unit']>
    ) => {
      state.unit = payload;
    },
  }
});

export const {
  setLocation,
  setUnit,
} = mainSlice.actions;