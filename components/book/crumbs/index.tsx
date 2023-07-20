import Link from "next/link";
import styles from "@/components/book/Crumbs/index.module.scss";
import ImageCommon from "@/components/common/ImageCommon";
import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import { IBook } from "@/typings/book.interface";

interface IProps {
  bookInfo: IBook;
}

const BookCrumbs: FC<IProps> = (
  { bookInfo }) => {
  const { t } = useTranslation();

  const typeTwoId = bookInfo.typeTwoIds?.[0] || 0;
  let typeTwoName = t('others.all')
  if (bookInfo.typeTwoNames?.[0] && bookInfo.typeTwoNames?.[0] !== 'all') {
    typeTwoName = bookInfo.typeTwoNames?.[0]
  }

  return <div className={styles.crumbsWrap}>
    <Link href="/" className={styles.crumbsItem}>
      {t('nav.home')}
      <ImageCommon source={'/images/layout/link.png'} className={styles.crumbsIcon}/>
    </Link>
    <Link className={styles.crumbsItem} href={`/browse/${typeTwoId}/${bookInfo.typeTwoName || 'all'}`}>
      {typeTwoName}
      <ImageCommon source={'/images/layout/link.png'} className={styles.crumbsIcon}/>
    </Link>
    <div className={styles.crumbsItemTxt}>{bookInfo.bookName}</div>
  </div>
}

export default BookCrumbs;
