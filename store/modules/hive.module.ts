import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHiveStore } from "@/store/store.interfaces";
import ClientConfig from "@/client.config";
import { isIos } from "@/utils/ownOs";
import { getUserLandId } from "@/utils/logParams";
import { InitFingerprint } from "@/utils/fingerprint";
import { ELanguage } from "typings/home.interface";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";
import { IClipboard } from "@/typings/hive.interfaces";
import { netIpUa } from "@/server/clientLog";

export const clipboardAsync = createAsyncThunk(
  'hive/getClipboard',
  async () => {
    const ua = navigator.userAgent;
    const h5fingerPrint = await InitFingerprint();
    const channelCode = isIos(ua) ? ClientConfig.ios.channelCode : ClientConfig.android.channelCode;
    const clipboard = {
      ip: "0.0.0.0",
      h5uid: getUserLandId(),
      channelCode,
      h5fingerPrint,
      ua,
      url: window.location.href,
      bid: '',
      cid: 0,
      shareCode: 0,
    }
    const ip = await netIpUa(clipboard)
    return {
      ...clipboard,
      ip
    }
  }
)

const getCopyText = (clipboard: IClipboard) => {
  const { bid = "", channelCode = "", cid = 0, h5uid = "", ua = '' } = clipboard;
  const queryStr = !cid ? `${h5uid}_${bid}_${channelCode}_gg` : `${h5uid}_${bid}_${channelCode}_gg_${cid}`;
  return `[dramaBox]https://app.dramaboxdb.com/${ isIos(ua) ? 'ios' : 'android' }/open?c=${ queryStr } UA8322`
}

export const hiveSlice = createSlice<IHiveStore, SliceCaseReducers<IHiveStore>>({
  name: 'hive',
  initialState: () => {
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
      },
      copyText: '',
      language: ELanguage.English
    }
  },
  reducers: {
    setClipboard: (state, action: PayloadAction<{ bid?: string; cid?: string | number;}>) => {
      const clipboardObj = Object.assign(state.clipboard, action.payload);
      state.copyText = getCopyText(clipboardObj)
    },
    setLanguage: (state, action: PayloadAction<ELanguage>) => {
      state.language = action.payload;
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(clipboardAsync.fulfilled, (state, action) => {
        const clipboardObj = Object.assign(state.clipboard, action.payload);
        state.copyText = getCopyText(clipboardObj)
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
