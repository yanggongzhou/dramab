import { IHomeResItem } from "@/typings/home.interface";

export interface INetMoreReq {
  id: string;
  name: string;
  pageNum?: number;
  pageSize?: number;
}

export interface INetMoreResult {
  data: IHomeResItem;
  currentPage: number;
  pages: number;
}
