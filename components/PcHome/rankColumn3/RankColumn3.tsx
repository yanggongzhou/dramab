import React, { FC } from 'react'
import styles from '@/components/PcHome/rankColumn3/RankColumn3.module.css'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";

interface IProps {
  dataSource: IBookItem[];
}

const RankColumn3: FC<IProps> = ({ dataSource }) => {

  const data = dataSource && dataSource.length > 0 ? [dataSource[1], dataSource[0], dataSource[2]] : []

  return <div className={styles.rankColumn3Wrap}>
    {data.length > 0 ? data.map((book, bookInd) => {
      if (!book) return <div key={'empty' + bookInd} />;
      const { bookId, typeTwoName = 'all', replacedBookName, cover, bookName, author, introduction } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={bookInd === 1 ? styles.imageItem1Wrap1 : styles.imageItem1Wrap}>
        <ImageCommon className={bookInd === 1 ? styles.topIcon1 : styles.topIcon} source={`/images/home/Top${bookInd + 1}.png`}/>
        <Link href={routerToBookInfo}>
            <ImageCommon w={220} h={290} className={bookInd === 1 ? styles.bookImage1 : styles.bookImage} source={cover} alt={bookName}/>
        </Link>

        <Link href={routerToBookInfo}>
            <i>{author}</i>
        </Link>
      </div>
    }) : null}
  </div>
}

export default RankColumn3;
