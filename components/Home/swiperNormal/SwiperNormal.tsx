import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'
import styles from './SwiperNormal.module.css'
import ImageCommon from "@/components/common/ImageCommon";
import { IBannerItem } from "typings/home.interface";
import Link from "next/link";

interface IProps {
  bannerList: IBannerItem[];
}

const SwiperNormal: FC<IProps> = ({ bannerList}) => {

  const items = bannerList.map((ban) => (
    <Swiper.Item key={ban.id} className={styles.content} >
      <Link href={`/book_info/${ban.bookId}/${ban.typeTwoName || 'all'}/${ban.replacedBookName}`}>
          <ImageCommon source={ ban.bannerUrl} w={686} h={344} className={styles.contentImg} alt={ban.bookName}/>
      </Link>
    </Swiper.Item>
  ))
  return <Swiper
    style={{
    '--height': '3.44rem',
    '--track-padding': ' 0 0 0',
    }}
    indicatorProps={{
      style: {
        '--dot-size': '0.12rem',
        '--active-dot-size': '0.12rem',
        '--dot-spacing': '0.32em',
      }
    }}
    className={styles.swiperBox}
    autoplay
    loop>{ items }</Swiper>
}

export default SwiperNormal
