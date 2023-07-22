import { ELanguage } from "@/typings/home.interface";

const ClientConfig = {
  name: "Drama Box",
  companyName: "STORYMATRIX TECHNOLOGY SINGAPORE PTE.LTD.",
  productName: "db",
  // todo googleCode
  googleCode: "G-LE31ZV673D",
  email: "dramaboxapp@gmail.com",
  ios: {
    deeplink: "https://app.dramaboxdb.com/ios/open?c=",
    pname: "com.storymatrix.drama",
    link: "https://apps.apple.com/us/app/id6445905219",
    channelCode: "DISEO1000000",
  },
  android: {
    pname: "com.storymatrix.drama",
    link: "https://play.google.com/store/apps/details?id=com.storymatrix.drama",
    channelCode: "DASEO1000000",
  },
  logDataType: "dramabox",
  netUrl: {
    hive: "https://log.dramaboxdb.com/h5_stand_final_log.php",
    ipua: "https://drama.hw.dzods.cn/drama-box/ad/cache/ua",
  }
}

export default ClientConfig;

export const LanguageDefaultBookId = {
  [ELanguage.English]: '21000203245',
  // [ELanguage.Indonesia]: '21000203853',
  [ELanguage.Korean]: '21000203914',
  [ELanguage.ZH]: '21000204144',
  [ELanguage.TC]: '21000200077',
}
