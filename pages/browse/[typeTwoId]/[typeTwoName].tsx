import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import React from "react";
import { netBrowse } from "@/server/home";
import { ELanguage, IBookItem } from "typings/home.interface";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MBrowse from "@/components/browse";
import PcBrowse from "@/components/pcBrowse";
import { IBrowseTypes } from "typings/browse.interface";
import useHiveLog from "@/hooks/useHiveLog";

interface IProps {
  isPc: boolean;
  bookList: IBookItem[];
  types: IBrowseTypes[];
  pageNo: number;
  pages: number;
  typeTwoId: number;
  typeTwoName: string;
}

const Browse: NextPage<IProps> = (
  { isPc, types, bookList, pageNo, pages, typeTwoId}) => {
  const HiveLog = useHiveLog();
  // 浏览页点击 用户点击进入书籍详情时候
  const bookClick = () => {
    // HiveLog.track('Browse_click')
  }
  return <>
    {isPc ?
      <PcBrowse
        pageNo={pageNo}
        types={types}
        bookList={bookList}
        pages={pages}
        typeTwoId={typeTwoId}
      /> :
      <MBrowse
        pageNo={pageNo}
        types={types}
        bookList={bookList}
        pages={pages}
        typeTwoId={typeTwoId}
        bookClick={bookClick}
      />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { page = '1', typeTwoId = 0, typeTwoName = '' } = query;

  const response = await netBrowse({
    typeTwoId: Number(typeTwoId) || 0,
    pageNo: Number(page),
    pageSize: 15
  }, locale as ELanguage)
  if (response === 'BadRequest_404' ) {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { currentPage = 1, pages = 0, bookList = [], types = [] } = response;
  if (bookList.length !== 0 || types.length !== 0) {
    types.unshift({ id: 0, name: 'all', replaceName: 'all', checked: false });
  }

  return {
    props: {
      types,
      bookList,
      pageNo: currentPage,
      pages,
      typeTwoId: Number(typeTwoId),
      isPc: ownOs(ua).isPc,
      typeTwoName,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}

export default Browse
