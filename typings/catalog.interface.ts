export enum ECatalogTab {
  synopsis = '1',
  catalog = '2'
}

export interface IChapterListItem {
  id: number;
  index: number;
  unlock: boolean;
  chapterName: string;
}

export interface INetListChapterReq {
  bookId: string;
  pageNum?: number;
  pageSize?: number;
  rid?: string;
}

export interface INetListChapterResData {
  bookId: string;
  id: number;
  volumeName: string; // 卷名称
  chapterName: string;
  chapters: IChapterListItem[]
  isCharge: boolean;
}

export interface INetListChapterRes {
  data: INetListChapterResData[];
  currentPage: number;
  totalPage: number;
}
