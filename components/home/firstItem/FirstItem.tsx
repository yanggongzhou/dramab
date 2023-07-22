import React, { FC } from 'react'
import styles from '@/components/home/firstItem/FirstItem.module.css'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import ImageCover from "@/components/common/image/ImageCover";

interface IProps {
  dataSource: IBookItem[];
}

const FirstItem: FC<IProps> = ({ dataSource }) => {
  return <div className={styles.firstItemWrap}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((book, bookInd) => {
      const { bookId, typeTwoName = 'all', replacedBookName, cover, bookName } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.itemBox}>
        <ImageCover
          priority={bookInd < 6}
          href={routerToBookInfo}
          className={styles.bookImage}
          src={cover}
          width={218}
          height={294}
          alt={bookName}
        />
        <Link href={routerToBookInfo} className={styles.bookName}>
          {bookName}
        </Link>
      </div>
    }) : null}
  </div>
}

export default FirstItem;
