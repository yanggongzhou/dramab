export enum EHomeStyle {
  small = 'SMALL_CARD_LIST',
  big = 'BIG_CARD_COMBINATION',
}


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
  columnName: EnumPosition;
  typeTwoNames: string[];
  typeTwoName: string;
  typeTwoIds: string[];
}

export enum ELanguage {
  English = 'en',
  CN = 'cn', // 简体中文
  TC = 'tc', // 繁體中文
  Korean = 'ko', // 韩语
}

export const LanguageActions: { text: string; key: ELanguage }[] = [
  { text: '简体中文', key: ELanguage.CN },
  { text: 'English', key: ELanguage.English },
  { text: '繁體中文', key: ELanguage.TC },
  { text: '한국인', key: ELanguage.Korean },
]
