import { IPageColumnsItem } from "./home.interface";

export interface INetMoreReq {
  name: string;
  pageNum?: number;
  pageSize?: number;
}

export interface INetMoreResult {
  data: IPageColumnsItem;
  currentPage: number;
  pages: number;
}
