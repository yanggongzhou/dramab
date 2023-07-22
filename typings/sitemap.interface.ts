import { ELanguage } from "./home.interface";

// 0全量，1增量，默认0
export enum ESearchType {
  ALL = 0,
  INCREASE = 1
}

export interface INetAllBookReq {
  searchType: ESearchType;
}

export interface INetAllBookRes {
  bookId: string;
  replacedBookName: string;
  typeTwoName: string;
  chapterCount: number;
  utime: string;
  languages: ELanguage[];
}

export interface INetAllChapterReq {
  bookId: string;
  searchType: ESearchType;
}

export interface INetAllChapterRes {
  bookId: string;
  replacedBookName: string;
  // typeOneName: string;
  chapters: { id: string; utime: string; }[];
  languages: ELanguage[];
}

export interface INetAllColumnRes {
  name: string;
  bookCount: number
}

export interface INetIncrementBookRes {
  data: string[];
  pageNo: number;
  limit: number;
  totalNum: number;
  totalPage: number;
}
