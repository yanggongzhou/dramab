import FingerprintJS from "@fingerprintjs/fingerprintjs"
import ClientConfig from "@/client.config";

export const InitFingerprint = (): Promise<string> => {
  const h5fingerPrint = window.localStorage.getItem(`${ClientConfig.productName}_seo_h5fingerprint`);
  return new Promise((resolve, reject) => {
    if (!h5fingerPrint || !h5fingerPrint.includes(ClientConfig.productName)) {
      FingerprintJS.load()
        .then(fp => fp.get())
        .then(result => {
          const murmur = ClientConfig.productName + '_' + result.visitorId;
          window.localStorage.setItem(`${ClientConfig.productName}_seo_h5fingerprint`, murmur);
          resolve(murmur)
        }).catch(e => {
        console.log(e)
        resolve('');
      })
    } else {
      resolve(h5fingerPrint)
    }
  })
}
