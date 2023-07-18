import { ELanguage, EnumPosition } from "./home.interface";
import { ESearchType } from "./sitemap.interface";

export interface INetBookReq {
  bookId: string;
  language?: ELanguage;
}

export interface IBook {
  bookId: string;
  bookName: string;
  chapterCount: number;
  commentCount: number;
  contractStatus: string;
  contractType: string;
  cover: string;
  defaultChapterId: number;
  editor: string;
  introduction: string;
  language: ELanguage;
  lastChapterId: number;
  lastChapterName: string;
  lastChapterTime: string;
  lastUpdateTimeDisplay: string;
  ratings: number;
  totalWords: number;
  viewCountDisplay: string;
  writeStatus: string;
  author: string;
  replacedBookName: string;
  firstChapterId?: string;
  columnName: EnumPosition;
  typeTwoNames: string[];
  typeTwoIds: number[];
  typeTwoName: string;
}

export interface INetBookRes extends IBook{
  book: IBook;
  recommends: IBook[];
  chapter: {
    id: string;
    name: string;
  };
  column: {
    bookId: string;
    bookName: string;
    columnName: EnumPosition;
  };
  languages: ELanguage[]
}

export interface INetKeywordsReq {
  searchType: ESearchType;
  pageNum: number;
  pageSize?: number;
}

export interface IKeywordItem {
  id: string;
  name: string;
  utime: string;
}

export interface INetKeywordsRes {
  data: IKeywordItem[];
  currentPage: number;
  total: number;
  pages: number;
}

export interface INetKeywordTagReq {
  id: string;
  pageNum: number;
  pageSize?: number;
}

export interface INetKeywordTagRes {
  books: IBook[];
  currentPage: number;
  pages: number;
  total: number;
  relationKeywords: IKeywordItem[];
  keyword: string;
  keyStatus: 0 | 1;
}

export interface ITagBookItem extends IBook {
  bookId: string;
  bookName: string;
  copyrighted: boolean;
  cover: string;
  introduction: string;
  recommend: boolean;
  tag: string;
  simpleLanguage: ELanguage;
  isHot: ETagBookItemIsHot;
}

export enum EAggregatePageProperties {
  有版权书籍 = 'y',
  推荐书籍 = "t"
}

export enum ETagBookItemIsHot {
  yes = 1,
  no = 0
}
