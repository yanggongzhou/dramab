import React, { FC } from 'react'
import styles from '@/components/Home/rankColumn/RankColumn.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";

interface IProps {
  dataSource: IBookItem[];
}

const RankColumnItem = ({ dataSource, index = 1 }: { dataSource: IBookItem[]; index?: number }) => {
  return <div className={styles.rankColumnBox}>
    {dataSource && dataSource.length > 0 ? (dataSource as IBookItem[]).map((book, bookInd) => {
      const { bookId, typeTwoName = 'all', replacedBookName, cover, bookName, viewCountDisplay } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.rankColumnItem}>
        <div className={styles.imgBox}>
          <Link href={routerToBookInfo}>
              <ImageCommon w={154} h={208} className={styles.bookImage} source={cover} alt={bookName}/>
          </Link>
          <Link href={routerToBookInfo} className={styles.bookIconBox}>
              <ImageCommon className={styles.bookIcon} source={`/images/home/rank-top${bookInd + index}.png`}/>
          </Link>
        </div>
        <div className={styles.introBox}>
          <Link href={routerToBookInfo}>
            {bookName}
          </Link>
          <Link href={routerToBookInfo}>
              <ImageCommon className={styles.bookViews} source={`/images/home/rank-views.png`}/>
              <span>{viewCountDisplay}</span>
          </Link>
        </div>
      </div>
    }) : null}
  </div>
}

const RankColumn: FC<IProps> = ({ dataSource }) => {
  const item1Data = dataSource.slice(0, 3);
  const item2Data = dataSource.slice(3, 6);
  return <div className={styles.rankColumnWrap}>
    <div className={styles.rankColumnWrap2}>
      <RankColumnItem dataSource={item1Data}/>
      <RankColumnItem dataSource={item2Data} index={4}/>
    </div>
  </div>
}

export default RankColumn;
