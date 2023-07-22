import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'
import styles from './SwiperNormal.module.scss'
import { IBookItem } from "typings/home.interface";
import Link from "next/link";
import ImageCover from "@/components/common/image/ImageCover";

interface IProps {
  bannerList: IBookItem[];
}

const SwiperNormal: FC<IProps> = ({ bannerList }) => {

  const items = bannerList.map((item) => (
    <Swiper.Item key={item.bookId} className={styles.content}>
      <div className={styles.swiperItem}>
        <ImageCover
          href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`}
          className={styles.contentImgBox}
          src={item.cover}
          width={218}
          height={294}
          alt={item.bookName}
        />
        <div className={styles.contentImgMark}/>

        <div className={styles.rightCard}>
          <div className={styles.rightCardTop}>
            <Link className={styles.bookName} href={`/book_info/${item.bookId}/${item.typeTwoName || 'all'}/${item.replacedBookName}`}>
              {item.bookName}
            </Link>
            <p className={styles.viewCount}>{item.viewCount} Episodes</p>
            <p className={styles.intro}>{item.introduction}</p>
          </div>
          <div className={styles.rightCardBottom}>
            { ['Film', 'Series'].map(val => {
              return <div key={val} className={styles.rightTag}>{val}</div>
            })}
          </div>
        </div>
      </div>
    </Swiper.Item>
  ))
  return <Swiper
    style={{
      '--height': '3.16rem',
    }}
    indicatorProps={{
      style: {
        '--dot-spacing': '0.08rem',
      }
    }}
    trackOffset={2}
    slideSize={96}
    className={styles.swiperBox}
    autoplay
    loop>{items}</Swiper>
}

export default SwiperNormal
