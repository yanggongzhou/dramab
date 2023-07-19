import React, { FC } from 'react'
import styles from '@/components/home/firstItem/FirstItem.module.css'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";

interface IProps {
  dataSource: IBookItem[];
}

const FirstItem: FC<IProps> = ({ dataSource }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((book) => {
      const { bookId, typeTwoName = 'all', replacedBookName, cover, bookName } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.itemBox}>
        <Link href={routerToBookInfo}>
          <ImageCommon w={180} h={238} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>
        <Link href={routerToBookInfo} className={styles.bookName}>
          {bookName}
        </Link>
      </div>
    }) : null}
  </div>
}

export default FirstItem;
