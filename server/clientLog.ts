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

// IPUA
export async function netIpUa(clipboard: IClipboard) {
  const params = {
    clipboard: JSON.stringify(clipboard),
    ua: clipboard.ua,
    h5Uid: clipboard.h5uid,
  }
  return new Promise((resolve) => {
    fetch(ClientConfig.netUrl.ipua, {
      method: "post",
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': "application/json"
      }),
      keepalive: true
    }).then(response => {
      response.json().then((res) => {
        resolve(res.ip ? res.ip : '0.0.0.0');
      }).catch((error) => {
        resolve('0.0.0.0')
      })
    }).catch((error) => {
      resolve('0.0.0.0')
    })
  })

}
