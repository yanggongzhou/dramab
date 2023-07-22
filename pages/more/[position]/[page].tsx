import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { netMoreBook } from "@/server/home";
import { ELanguage, EnumPosition, EPositionShowName, IBookItem, IHomeResItem } from "typings/home.interface";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PcMore from "@/components/pcMore";
import MMore from "@/components/more";

interface IProps {
  isPc: boolean;
  bookData: IBookItem[];
  pageNo: number;
  pages: number;
  position: EnumPosition;
}

const More: NextPage<IProps> = ({ isPc, bookData, pageNo, pages, position }) => {
  return <>
    {isPc ? <PcMore position={position} pageNo={pageNo} pages={pages} bookData={bookData}/> :
      <MMore position={position} pageNo={pageNo} pages={pages} bookData={bookData}/>
    }
  </>
}

// 导出异步获取数据方法
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page = '1', position = '' } = query;
  //  Object.keys()返回可枚举的，Object.getOwnPropertyNames()返回所有的。
  if (!position || !Reflect.ownKeys(EnumPosition).includes(position.toString())) {
    return { notFound: true }
  }
  const response = await netMoreBook({
    name: 'New Releases',
    pageNum: Number(page),
  }, locale as ELanguage)

  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { currentPage = 1, pages = 0, data = {} as IHomeResItem } = response;
  const bookData = data?.items || [];
  // 返回的参数将会按照 key 值赋值到 HomePage 组件的同名入参中
  return {
    props: {
      bookData,
      pageNo: currentPage,
      pages,
      position,
      isPc: ownOs(ua).isPc,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}

export default More;
