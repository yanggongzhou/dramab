import { randomString } from '@/utils/other'
import ClientConfig from '@/client.config';
import { isIos, ownOs } from "@/utils/ownOs";
import { ELanguage } from "@/typings/home.interface";
import { AnyObject, IClipboard, ILogParams } from "@/typings/hive.interfaces";

export const getUserLandId = () => {
  const userlandId = window.localStorage.getItem('USER_LANDPID');
  if (!userlandId) {
    const _id = randomString();
    window.localStorage.setItem('USER_LANDPID', _id);
    return _id
  }
  return userlandId;
}

/**
 * 获取大数据打点参数
 */
interface IGetLogParams {
  event: string;
  clipboard: IClipboard;
  language: ELanguage;
  bookId?: string;
  chapterId?: string | 0;
  data?: AnyObject;
}
export const getLogParams = ({ event, clipboard, language, data = {} }: IGetLogParams): ILogParams => {
  const { channelCode, bid, h5uid, ua } = clipboard;
  const date = new Date();
  const log_id = randomString();
  return {
    bline: "db",
    app_version: "1.0.0",
    imei: "",
    oaid: "",
    idfa: "",
    pline: isIos(ua) ? 'ios': 'android',
    pkna: isIos(ua) ? ClientConfig.ios.pname : ClientConfig.android.pname,
    type: "luodiye",
    log_id, // 日志id 随机生成，16位字符串即可
    cts: new Date().getTime(), // 客户端时间，精确到毫秒
    chid: channelCode, // 渠道号
    uid: h5uid,
    event, // 事件名称
    data: {
      date: date.toLocaleDateString().replace(/\//g, '-'),
      product: ClientConfig.logDataType,
      action: 3, // 1 pv | 2 按钮点击下载
      clipboard: {
        ...clipboard,
      },
      bookId: bid,
      isPc: ownOs(ua).isPc ? 1 : 0,
      platform: navigator.platform,
      System_language: navigator.language,
      User_language: language,
      ...data,
    }
  }
}
