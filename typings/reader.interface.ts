export enum EnumTabs {
  Catalog,
  Night,
  Setting,
  Day,
}

export enum EnumBackGround {
  default1 = '#F6F6F6',
  default2 = '#FFF0DF',
  default3 = '#DAE6C5',
  night = '#27282A',
}

export enum EnumPBackGround {
  default1 = '#FFFFFF',
  default2 = '#FFF0DF',
  default3 = '#323232',
}

export const PcReaderBackGround = {
  [EnumPBackGround.default1]: '#F6F6F6',
  [EnumPBackGround.default2]: '#FFE7CD',
  [EnumPBackGround.default3]: '#2B2B2B',
}

export const PcReaderBackGroundLog = {
  [EnumPBackGround.default1]: '白色',
  [EnumPBackGround.default2]: '黄色',
  [EnumPBackGround.default3]: '黑色',
}

export const MReaderBackGroundLog = {
  [EnumBackGround.default1]: '白色',
  [EnumBackGround.default2]: '黄色',
  [EnumBackGround.default3]: '绿色',
  [EnumBackGround.night]: '黑色',
}
