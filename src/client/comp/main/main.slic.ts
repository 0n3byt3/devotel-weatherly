//external dependencies
import { createSlice } from "@reduxjs/toolkit";
//external types dependencies
import type {PayloadAction} from "@reduxjs/toolkit";
//internal dependencies
//internal types dependencies

interface MainState {
  location: undefined | {
    lat: number,
    lon: number
  },
}

const initialState: MainState = {
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