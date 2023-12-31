import { ELanguage } from "@/typings/home.interface";

const ClientConfig = {
  name: "Drama Box",
  companyName: "STORYMATRIX TECHNOLOGY SINGAPORE PTE.LTD.",
  productName: "db",
  googleCode: "G-BXDJ8KNG7N",
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
  [ELanguage.Korean]: '21000203914',
  [ELanguage.ZhHans]: '21000204144',
  [ELanguage.Zh]: '21000200077',
}
