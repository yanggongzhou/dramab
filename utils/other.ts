export function randomString() {
  const len = 16;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

export function compile(code: any) {
  code = JSON.stringify(code);
  const res: string[] = [];
  code.split("").forEach((c: any, i: any) => {
    res.push((code.charCodeAt(i) + 2).toString(16));
  });
  return res.join("");
}

//去除特殊字符~!@#$^-&*()=|{}':;',\[].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？
export function trimSpecial(str: string) {
  //替换字符串中的所有特殊字符（包含空格）
  if(str !== ""){
    const pattern=/[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    str = str.replace(pattern," ");
    str = str.split(' ').filter(val => !!val.trim()).join('-')
  }
  return str
}


export const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
