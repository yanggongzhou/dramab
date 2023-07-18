import { IBook } from "./book.interface";

export interface INetSearchReq {
  keyword: string;
  pageNo?: number;
  pageSize?: number;
}

export interface INetSearchRes {
  size: number;
  total: number;
  current: number;
  pages: number;
  records: IBook[];
}
