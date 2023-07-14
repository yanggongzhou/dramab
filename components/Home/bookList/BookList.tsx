import React, { FC } from 'react'
import styles from './BookList.module.css'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { IBook } from "@/typings/book.interface";

interface IProps {
  dataSource: IBookItem[] | IBook[];
  onSelect?: (bookId: string, bookName: string) => void;
}

const BookList: FC<IProps> = ({dataSource, onSelect}) => {
  return <div className={styles.bookListWrap}>
    {dataSource && dataSource.length > 0 && dataSource.map((book) => {
      const { bookId, bookName, author, introduction, cover, replacedBookName, typeTwoName = 'all' } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.imageItem1Wrap}>
        <Link href={routerToBookInfo}>
            <ImageCommon w={130} h={172} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>
        <div className={styles.bookInfo}>
          <Link href={routerToBookInfo}>
              <h2 className={styles.bookName}>{bookName}</h2>
          </Link>
          <Link href={routerToBookInfo}>
              <p className={styles.author}>{author}</p>
          </Link>
          <Link href={routerToBookInfo}>
            {introduction}
          </Link>
        </div>
      </div>
    })}
  </div>
}

export default BookList;
