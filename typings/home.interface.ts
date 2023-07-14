export enum EnumPosition {
  banner = 'banner',
  popular = 'Popular',
  trending = 'Trending',
  ranking = 'Ranking',
  'new-releases' = 'New Releases',
  romance = 'Romance',
  completed = 'Completed',
  'editors-picks' = "Editors' Picks",
  customInset = "inset"
}

export const EPositionShowName = {
  [EnumPosition.popular]: 'popular',
  [EnumPosition.trending]: 'trending',
  [EnumPosition.ranking]: 'ranking',
  [EnumPosition['new-releases']]: 'new-releases',
  [EnumPosition.romance]: 'romance',
  [EnumPosition.completed]: 'completed',
  [EnumPosition['editors-picks']]: 'editors-picks',
}

export interface IPageColumnsItem {
  id: number;
  name: EnumPosition;
  items: IBookItem[];
  columns: IPageColumnsItem[]
  more: boolean;
}

export interface IBannerItem {
  id: number;
  bookId: string;
  bookName: string;
  bannerUrl: string;
  viewCount: number;
  viewCountDisplay: string;
  replacedBookName: string;
  typeTwoNames: string[];
  typeTwoName: string;
}

export interface IBookItem {
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
  columnName: EnumPosition;
  index: number; // 自定义ranking参数
  typeTwoNames: string[];
  typeTwoName: string;
  typeTwoIds: string[];
}

export enum ELanguage {
  English = 'en',
  Indonesia = 'in', // 印尼语
  // Korean = 'ko', // 韩语
  // Tagalog = 'tl', // 菲律宾语
  // Thai = 'th', // 泰语
  // Spanish = 'es', // 西班牙语
}

export const LanguageActions: { text: string; key: ELanguage }[] = [
  { text: 'English', key: ELanguage.English },
  // { text: 'แบบไทย', key: ELanguage.Thai },
  // { text: '한국인', key: ELanguage.Korean },
  // { text: 'español', key: ELanguage.Spanish },
  { text: 'Indonesia', key: ELanguage.Indonesia },
  // { text: 'Filipino', key: ELanguage.Tagalog },
]
