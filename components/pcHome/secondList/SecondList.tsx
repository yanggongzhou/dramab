import React, { FC } from 'react'
import styles from '@/components/pcHome/secondList/SecondList.module.scss'
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { onImgError } from "@/components/common/image/ImageCover";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
  priority?: boolean;
}

const SecondList: FC<IProps> = ({ dataSource, priority = false }) => {
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
        bookName,
        viewCountDisplay = "0"
      } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName || 'all'}/${replacedBookName || 'null'}`
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

        <Link className={styles.viewCountDisplay} href={routerToBookInfo}>
          {`${viewCountDisplay} ${t("home.episodes")}`}
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
