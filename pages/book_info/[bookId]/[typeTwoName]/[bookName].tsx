import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { netBook } from "@/server/home";
import { IBook } from "typings/book.interface";
import PcBook from "@/components/pcBook";
import MBook from "@/components/book";
import { ownOs } from "@/utils/ownOs";
import { ELanguage } from "typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface IProps {
  isPc: boolean;
  bookId: string;
  bookInfo: IBook;
  firstChapterId: string;
  languages: ELanguage[];
}

const Book: NextPage<IProps> = (
  { isPc, bookInfo, firstChapterId }
) => {

  return <>
    { isPc ?
      <PcBook
        firstChapterId={firstChapterId}
        bookInfo={bookInfo}
      /> :
      <MBook
        firstChapterId={firstChapterId}
        bookInfo={bookInfo}
      />
    }
  </>
}

export default Book;

// ssr
export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  const { bookId = '' } = query as { bookId: string;};

  const response = await netBook({ bookId }, locale as ELanguage);
  if (response === 'BadRequest_404') {
    return { notFound: true }
  }
  if (response === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  const { book = {}, chapter, languages = [] } = response;

  return {
    props: {
      bookId,
      firstChapterId: chapter?.id || '',
      bookInfo: book,
      isPc: ownOs(ua).isPc,
      languages,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    },
  }
}
