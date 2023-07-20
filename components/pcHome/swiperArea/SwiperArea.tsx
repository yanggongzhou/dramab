import React, { FC } from 'react'
import styles from './SwiperArea.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
import Link from "next/link";

interface IProps {
  bannerList: IBookItem[];
}

const SwiperArea: FC<IProps> = ({ bannerList = [] }) => {
  const { bookId, typeTwoName = 'all', replacedBookName = 'null' } = bannerList?.[0]
  const routerToBookInfo = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
  return <div className={styles.swiperWrap}>
    <div className={styles.swiperBox}>
      <div className={styles.leftCard}>
        <Link href={routerToBookInfo}>
          <ImageCommon source={bannerList[0].cover} className={styles.leftCardImg} alt={bannerList[0].bookName}/>
        </Link>

        <Link href={routerToBookInfo} className={styles.leftCardContent}>
          <div className={styles.leftCardContentTop}>
            <h2>{bannerList[0].bookName}</h2>
            <p className={styles.viewCount}>{bannerList[0].viewCount} Episodes</p>
            <p className={styles.intro}>{bannerList[0].introduction}</p>
          </div>

          <div className={styles.leftCardContentBottom}>
            { ['Film', 'Series', 'Dramas', 'Documentaries'].map(val => {
              return <div key={val} className={styles.leftTag}>{val}</div>
            })}
          </div>
        </Link>
      </div>

      <div className={styles.rightCard}>
        { [ bannerList[1], bannerList[2] ].map(item => {
          return <div key={item.bookId} className={styles.rightCardItem}>
            <Link href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`}>
              <ImageCommon source={item.cover} className={styles.rightCardItemImg}/>
            </Link>

            <div className={styles.rightCardContent}>
              <div className={styles.rightCardContentTop}>
                <Link className={styles.bookName} href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`}>
                  {item.bookName}
                </Link>
                <Link href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`} className={styles.viewCount}>{item.viewCount} Episodes</Link>
                <Link href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`} className={styles.intro}>{item.introduction}</Link>
              </div>
              <Link href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`} className={styles.rightCardContentBottom}>
                { ['Film', 'Series'].map(val => {
                  return <div key={val} className={styles.rightTag}>{val}</div>
                })}
              </Link>
            </div>
          </div>
        }) }
      </div>
    </div>
  </div>
}

export default SwiperArea
