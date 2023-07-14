import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { netIP } from "@/server/clientLog";
import { IHiveStore } from "@/store/store.interfaces";
import { compile, randomString } from "@/utils/other";
import ClientConfig from "@/client.config";
import { isIos } from "@/utils/ownOs";
import { getUserLandId } from "@/utils/logParams";
import { InitFingerprint } from "@/utils/fingerprint";
import { ELanguage } from "typings/home.interface";

export const clipboardAsync = createAsyncThunk(
  'hive/getClipboard',
  async () => {
    const ip = await netIP()
    const ua = navigator.userAgent;
    const h5fingerPrint = await InitFingerprint();
    const channelCode = isIos(ua) ? ClientConfig.ios.channelCode : ClientConfig.android.channelCode;
    return {
      ip: ip || '0.0.0.0',
      h5uid: getUserLandId(),
      channelCode,
      h5fingerPrint,
      ua,
      url: window.location.href,
    }
  }
)

export const hiveSlice = createSlice({
  name: 'hive',
  initialState: (): IHiveStore => {
    return {
      clipboard: {
        ip: "0.0.0.0",
        h5uid: "",
        bid: '',
        channelCode: '',
        cid: 0,
        shareCode: 0,
        url: process.env.WebDomain ?? '',
        ua: '',
        h5fingerPrint: "",
        fingerPrintPversion: 1,
      },
      copyText: '',
      language: ELanguage.English
    }
  },
  reducers: {
    setClipboard: (state: IHiveStore, action: PayloadAction<{ bid?: string; cid?: string | number;}>) => {
      const clipboardObj = Object.assign(state.clipboard, action.payload);
      // state.copyText = ClientConfig.clientId + compile(clipboardObj);
    },
    setLanguage: (state: IHiveStore, action: PayloadAction<ELanguage>) => {
      state.language = action.payload;
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(clipboardAsync.fulfilled, (state, action) => {
        const clipboardObj = Object.assign(state.clipboard, action.payload);
        // state.copyText = ClientConfig.clientId + compile(clipboardObj);
      })
    ;
  }
});

export const { setClipboard, setLanguage } = hiveSlice.actions;


// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState())
//       if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount))
//       }
//     }
//
export const hiveReducer = hiveSlice.reducer;
