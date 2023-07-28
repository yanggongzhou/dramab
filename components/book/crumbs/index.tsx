import Link from "next/link";
import styles from "@/components/book/crumbs/index.module.scss";
import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IBookItem } from "@/typings/home.interface";

interface IProps {
  bookInfo: IBookItem;
}

const BookCrumbs: FC<IProps> = (
  { bookInfo }) => {
  const { t } = useTranslation();

  const typeTwoId = bookInfo.typeTwoIds?.[0] || 0;
  let typeTwoName = t('browse.all')
  if (bookInfo.typeTwoNames?.[0] && bookInfo.typeTwoNames?.[0] !== 'all') {
    typeTwoName = bookInfo.typeTwoNames?.[0]
  }

  return <div className={styles.crumbsWrap}>
    <Link href="/" className={styles.crumbsItem}>
      {t('home.home')}
      <Image
        className={styles.crumbsIcon}
        width={48}
        height={48}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <Link className={styles.crumbsItem} href={`/browse/${typeTwoId}/${bookInfo.typeTwoName || 'all'}`}>
      {typeTwoName}
      <Image
        className={styles.crumbsIcon}
        width={48}
        height={48}
        src={'/images/layout/link.png'}
        alt={'>'}
      />
    </Link>
    <div className={styles.crumbsItemTxt}>{bookInfo.bookName}</div>
  </div>
}

export default BookCrumbs;
