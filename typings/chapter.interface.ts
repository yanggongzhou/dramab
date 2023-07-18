import { ELanguage } from "./home.interface";

export interface INetChapterReq {
  bookId: string;
  chapterId?: number;
  language?: ELanguage;
}

export interface IChapter {
  allowCopy: number;
  bookId: string;
  bookPrice: number;
  chapterExtendVo: {
    fsize: number;
    furl: string;
    modifyFileUrl: string;
    msize: number;
    murl: string;
    nextPreviewContent: string;
  },
  chapterIndex: number;
  chapterName: string;
  coins: number;
  content: string;
  ctime: string;
  extend: string;
  filePath: string;
  format: string;
  id: number;
  index: number;
  nextChapterId: number;
  nextChapterName: string;
  poster: string;
  prevChapterId: number;
  prevChapterName: string;
  previewContent: string;
  price: number;
  publishTime: string;
  sequence: number;
  status: number;
  sumAll: number;
  unit: string;
  utime: string;
  volumeId: number;
  wordNum: number;
  languages: ELanguage[];
  unlock: boolean;
  lastChapterId: string;
}

export interface INetChapterRes extends IChapter {
  next: IChapter;
  prev: IChapter;
}


