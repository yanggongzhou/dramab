import React, { FC } from 'react'
import styles from './SecondItem.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
}

const SecondItem: FC<IProps> = ({ dataSource }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.secondItemWrap}>
    {dataSource.map((book) => {
      const {
        bookId,
        typeTwoName = 'all',
        replacedBookName,
        cover,
        bookName,
        author,
        viewCountDisplay
      } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.imageItem1Wrap}>
        <Link href={routerToBookInfo}>
            <ImageCommon w={192} h={258} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>
        <Link href={routerToBookInfo}>
            <h2 className={styles.bookName}>{bookName}</h2>
        </Link>

        <Link href={routerToBookInfo} className={styles.author}>
            <i>{t('others.by')}: {author}</i>
        </Link>
        <Link href={routerToBookInfo}  className={styles.viewCountDisplay}>
            <span>{viewCountDisplay} </span> {t('menu.Views')}
        </Link>
      </div>
    })}
  </div>
}

export default SecondItem;
