import React, { FC } from 'react'
import styles from '@/components/PcHome/firstItem/FirstItem.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IProps {
  dataSource: IBookItem[];
}

const PcFirstItem: FC<IProps> = ({ dataSource }) => {
  const { t } = useTranslation()

  if (dataSource.length === 0) {
    return null
  }

  return <div className={styles.firstItemWrap}>
    {dataSource.map((book) => {
      const {
        bookId,
        typeTwoName = 'all',
        replacedBookName,
        cover,
        bookName,
        author,
        viewCountDisplay,
        introduction
      } = book;
      const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
      return <div key={bookId} className={styles.imageItem1Wrap}>
        <Link href={routerToBookInfo}>
            <ImageCommon w={160} h={212} className={styles.bookImage} source={cover} alt={bookName}/>
        </Link>

        <div className={styles.bookRight}>
          <div>
            <Link href={routerToBookInfo}>
              <h2 className={styles.bookName}>{bookName}</h2>
            </Link>

            <Link href={routerToBookInfo}>
              <i>{t('others.by')}: {author}</i>
            </Link>

            <Link href={routerToBookInfo}>
              <span>{viewCountDisplay} </span> {t('menu.Views')}
            </Link>
          </div>

          <Link href={routerToBookInfo} className={styles.bookLine4}>
            {introduction}
          </Link>
        </div>
      </div>
    })}
  </div>
}

export default PcFirstItem;
