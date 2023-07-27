import { ELanguage } from "@/typings/home.interface";
import { IClipboard } from "@/typings/hive.interfaces";

export interface IHiveStore {
  clipboard: IClipboard;
  copyText: string;
  language: ELanguage;
}

export enum EDevice {
  mobile = 1,
  pc = 2,
}

export interface IAppStore {
  device: EDevice;
}
