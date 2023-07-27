import { ELanguage, IBookItem } from "@/typings/home.interface";

export interface INetBrowseReq {
  pageNo: number;
  typeTwoId?: number | null,
  pageSize?: number;
}

export interface IBrowseTypes {
  id: number;
  name: string;
  replaceName: string; // 去除特殊字符
  checked: boolean;
}

export interface INetBrowseRes {
  types: IBrowseTypes[];
  bookList: IBookItem[];
  currentPage: number;
  total: number;
  pages: number;
}

export interface INetBrowseTypeRes {
  id: number; // 类目id (包含全部：id = 0 为全部)
  name: string; // 类目名称 (包含全部：name = all 为全部) all | Fantasy ....
  replaceName: string; // 去除特殊字符
  simpleLanguage: ELanguage; // 语言分类
  total: number; // 该语言类目下，书籍的总数
}
