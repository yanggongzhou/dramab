import React, { FC } from 'react'
import styles from '@/components/PcHome/rankColumn1/RankColumn1.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
}

const RankColumn1: FC<IProps> = ({ dataSource }) => {
  const { t } = useTranslation()
  return <div className={styles.rankColumn1Wrap}>
    {dataSource && dataSource.length > 0 && (dataSource as IBookItem[]).map((book, bookInd) => {
      const { bookId, typeTwoName = 'all', replacedBookName, cover, bookName, viewCountDisplay } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.imageItem1Wrap}>
        <Link href={routerToBookInfo}>
            <ImageCommon w={60} h={80} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>
        <Link href={routerToBookInfo} className={bookInd > 2 ? styles.bookIndex : styles.bookRow1}><i>{bookInd + 1}</i>
        </Link>
        <div className={styles.bookRow2}>
          <Link href={routerToBookInfo} className={styles.bookName}>{bookName}
          </Link>
          <Link href={routerToBookInfo} className={styles.viewCountDisplay}>
              <span>{viewCountDisplay} </span> {t('menu.Views')}
          </Link>
        </div>
      </div>
    })}
  </div>
}

export default RankColumn1;
