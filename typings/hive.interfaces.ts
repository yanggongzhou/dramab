import { ELanguage } from "@/typings/home.interface";

export interface AnyObject<T = any> { [key: string]: T }
// action
export enum ELogParamsAction {
  pv = 1,
  download = 2,
  other = 3
}

// 剪切板
export interface IClipboard {
  ip: string;
  h5uid: string;
  bid: string;
  channelCode: string;
  cid: string | number;
  shareCode: string | number;
  url: string;
  ua: string;
  h5fingerPrint: string;
}

// 打点参数
export interface ILogParams {
  bline: string;
  app_version: string;
  imei: string;
  oaid: string;
  idfa: string;
  pline: 'ios' | 'android' | 'incompatible';
  pkna: string;
  type: "luodiye";
  log_id: string; // 日志id 随机生成，16位字符串即可
  cts: number; // 客户端时间，精确到毫秒
  chid: string; // 渠道号
  uid: string;
  event: string;
  data: ILogParamsData & AnyObject;
}

interface ILogParamsData {
  date: string;
  product: string;
  action: ELogParamsAction; // 1 pv | 2 按钮点击下载
  clipboard: IClipboard;
  bookId: string;
  isPc: 1 | 0;
  platform: string;
  System_language: string;
  User_language: ELanguage;
}
