import React, { FC } from "react";
import styles from '@/components/more/pagination/MorePagination.module.css'
import Link from "next/link";
import { Toast } from "antd-mobile";
import { useTranslation } from "next-i18next";

interface IProps {
  prevPath: string;
  page: string | number;
  totalPage: number;
  query?: string;
}

const MorePagination: FC<IProps> = ({ prevPath, totalPage, page, query = '' }) => {
  const { t } = useTranslation();
  const prevPage = Number(page) - 1;
  const nextPage = Number(page) + 1;

  return <div className={styles.paginationWrap} style={query ? { padding: '0.24rem 0' } : {}}>
    {prevPage && prevPage > 0 ? <Link href={prevPath + prevPage + query} replace scroll className={styles.linkItem}>
        {t('bookInfo.PreviousPage')}
      </Link> :
      <div
        onClick={() => {
          Toast.show(t('reading.firstChapterTip'))
        }}
        className={styles.pageItem}
      >{t('bookInfo.PreviousPage')}</div>}
    <div className={styles.linkItem}>{page}/{totalPage}</div>
    {Number(page) < totalPage ? <Link href={prevPath + nextPage + query} replace scroll className={styles.linkItem}>
        {t('bookInfo.NextPage')}
      </Link> :
      <div
        onClick={() => {
          Toast.show(t('reading.lastChapterTip'))
        }}
        className={styles.pageItem}>
        {t('bookInfo.NextPage')}
      </div>}
  </div>
}

export default MorePagination;
