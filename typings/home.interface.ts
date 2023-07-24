export enum EHomeStyle {
  small = 'SMALL_CARD_LIST',
  big = 'BIG_CARD_COMBINATION',
}

export interface IHomeResItem {
  id: number;
  name: string;
  style: EHomeStyle;
  items: IBookItem[];
  more: boolean;
  subName: string;
}

export interface IBookItem {
  name: string;
  actionType: string;
  action: string;
  chapterCount: number;
  ratings: number;
  bookId: string;
  bookName: string;
  author: string;
  introduction: string;
  cover: string;
  tags: string[];
  viewCount: number;
  lastUpdateTime: string;
  writeStatus: string; // COMPLETE
  viewCountDisplay: string;
  lastUpdateTimeDisplay: string;
  replacedBookName: string;
  firstChapterId?: string;
  columnName: string;
  typeTwoNames: string[];
  typeTwoName: string;
  typeTwoIds: string[];
}

export enum ELanguage {
  English = 'en',
  ZhHans = 'zhHans', // 简体中文
  Zh = 'zh', // 繁體中文
  Korean = 'ko', // 韩语
}

export const LanguageActions: { text: string; key: ELanguage }[] = [
  { text: '简体中文', key: ELanguage.ZhHans },
  { text: '繁體中文', key: ELanguage.Zh },
  { text: 'English', key: ELanguage.English },
  { text: '한국인', key: ELanguage.Korean },
]
