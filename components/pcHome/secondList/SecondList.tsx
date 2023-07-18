import React, { FC } from 'react'
import styles from './SecondList.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
}

const SecondList: FC<IProps> = ({ dataSource }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.secondListWrap}>
    {dataSource.map((book) => {
      const {
        bookId,
        typeTwoName = 'all',
        replacedBookName,
        cover,
        bookName,
        viewCount,
      } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.secondListBox}>
        <Link href={routerToBookInfo}>
          <ImageCommon w={192} h={258} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>
        <Link className={styles.viewCount} href={routerToBookInfo}>
          {viewCount} Episodes
        </Link>

        <Link href={routerToBookInfo} className={styles.bookName}>
          {bookName}
        </Link>

        <Link href={routerToBookInfo} className={styles.bookNameBox}>
          <div className={styles.bookNameHover}>
            {bookName}
          </div>
          <div className={styles.tagBox}>
            { ['Film', 'Series'].map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </Link>
      </div>
    })}
  </div>
}

export default SecondList;
