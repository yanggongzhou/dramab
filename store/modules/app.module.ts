import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EDevice, IAppStore } from "@/store/store.interfaces";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";

export const appSlice = createSlice<IAppStore, SliceCaseReducers<IAppStore>>({
  name: 'app',
  initialState: (): IAppStore => ({
    device: EDevice.mobile,
  }),
  reducers: {
    setDevice: (state, action: PayloadAction<EDevice>) => {
      state.device = action.payload;
    }
  }
});

export const { setDevice } = appSlice.actions;

export const appReducer = appSlice.reducer;
