import React, { FC } from 'react'
import styles from './SecondList.module.scss'
import { IBookItem } from "typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/image";

interface IProps {
  dataSource: IBookItem[];
  priority?: boolean;
}

const SecondList: FC<IProps> = ({ dataSource, priority = false }) => {

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.secondListWrap}>
    {dataSource.map((book) => {
      const {
        bookId,
        typeTwoName = 'all',
        replacedBookName,
        bookName,
        viewCount,
      } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.secondListBox}>

        <Link href={routerToBookInfo} className={styles.bookImage}>
          <Image
            priority={priority}
            className={styles.imageItem}
            onError={onImgError}
            placeholder="blur"
            blurDataURL={book.cover || '/images/defaultBook.png'}
            width={272}
            height={363}
            src={book.cover}
            alt={book.bookName}
          />
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
            { (book?.tags || []).map(val => {
              return <div key={val} className={styles.tagItem}>{val}</div>
            })}
          </div>
        </Link>
      </div>
    })}
  </div>
}

export default SecondList;
