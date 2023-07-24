import Service from "@/server/request";
import { ELanguage, IHomeResItem } from "@/typings/home.interface";
import { INetMoreReq, INetMoreResult } from "@/typings/more.interface";
import {
  INetBookReq,
  INetBookRes,
} from "@/typings/book.interface";
import {
  INetAllBookReq,
  INetAllBookRes,
  INetAllColumnRes,
  INetIncrementBookRes
} from "@/typings/sitemap.interface";
import { INetBrowseReq, INetBrowseRes, INetBrowseTypeRes } from "@/typings/browse.interface";

// 获取首页index
export const netHomeData = (language?: ELanguage): Promise<IHomeResItem[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return Service.post('/webfic/home/index', undefined, {
    headers: {
      language: language || ELanguage.English
    }
  })
}
// 浏览
export const netBrowse = async (params: INetBrowseReq, language?: ELanguage): Promise<INetBrowseRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.post('/webfic/home/browse', { pageSize: 60, ...params }, {
    headers: {
      language: language || ELanguage.English
    }
  })
}

// 查看更多
export const netMoreBook = async (params: INetMoreReq, language?: ELanguage): Promise<INetMoreResult | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.post('/webfic/home/more', { pageNum: 1, pageSize: 30, ...params }, {
    headers: {
      language: language || ELanguage.English
    }
  })
}

// 获取书籍详情
export const netBook = async (params: INetBookReq, language?: ELanguage): Promise<INetBookRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.post('/webfic/book/detail', {
    ...params,
    language
  }, {
    headers: {
      language: language || ELanguage.English
    }
  })
}

// 获取所有书籍id
export const netAllBook = async (params: INetAllBookReq): Promise<INetAllBookRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.get('/webfic/website/all', { params: { ...params } })
}

// 获取所有栏目信息
export const netAllColumn = async (): Promise<INetAllColumnRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.get('/webfic/website/column/stat')
}

// 本周有追更的书籍列表
export const netIncrementBook = async (pageNo = 1, pageSize = 10): Promise<INetIncrementBookRes | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.get('/webfic/website/book/update', { params: { pageNo, pageSize } })
}

// 全部浏览类目
export const netBrowseType = async (): Promise<INetBrowseTypeRes[] | 'BadRequest_404' | 'BadRequest_500'> => {
  return await Service.get('/webfic/website/type/list')
}
