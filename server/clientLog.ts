import ClientConfig from '@/client.config'
import { ipReg } from "@/utils/other";
import { IClipboard, ILogParams } from "typings/hive.interfaces";

// 大数据打点
export const netHiveLog = (logData: ILogParams) => {
  fetch(ClientConfig.netUrl.hive + `?json=${encodeURIComponent(JSON.stringify(logData))}`, {
    method: "GET",
    keepalive: true
  }).catch(error => console.warn('Error Log:', error))
}

// 获取Ip
export const netIP = async () => {
  let resIp = sessionStorage.getItem('DEVICE_IP');
  try {
    if (!resIp) {
      const response = await fetch(ClientConfig.netUrl.ip, { method: "get", keepalive: true });
      const res = await response.json();
      const _ip = res.data && res.data.ip ? res.data.ip : res.data;
      const _resIp = _ip ? _ip.toString().replace("\n", "") : ''
      if (_resIp && ipReg.test(_resIp)) {
        resIp = _resIp;
        sessionStorage.setItem('DEVICE_IP', _resIp);
      }
    }
    return resIp
  } catch (e) {
    console.warn('Error IP:', e)
    return resIp
  }
}

// IPUA
export function netIPUA(copyText: string, clipboard: IClipboard) {
  const { ua, h5uid, h5fingerPrint, url, bid, fingerPrintPversion } = clipboard;
  const params = {
    fbUrl: url,
    ua,
    h5uid,
    bid,
    h5fingerPrint,
    fingerPrintPversion,
    clipboard: copyText,
  }
  fetch(ClientConfig.netUrl.ipua, {
    method: "post",
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': "application/json" // x-www-form-urlencoded"
    }),
    keepalive: true
  }).catch(error => console.warn('Error IP UA:', error))
}
