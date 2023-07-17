import React, { FC, useEffect } from "react";
import SwiperNormal from "@/components/Home/swiperNormal/SwiperNormal";
import HomeTitle from "@/components/Home/homeTitle/HomeTitle";
import ImageCommon from "@/components/common/ImageCommon";
import FirstItem from "@/components/Home/firstItem/FirstItem";
import BookList from "@/components/Home/bookList/BookList";
import { EnumPosition, IBannerItem, IPageColumnsItem, } from "@/typings/home.interface";
import styles from '@/components/Home/MHome.module.scss'
import { useTranslation } from "next-i18next";

interface IProps {
  bannerList: IBannerItem[];
  homeData: IPageColumnsItem[];
}

const MHome: FC<IProps> = ({ homeData, bannerList }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.container}>

      { bannerList.length > 0 ? <SwiperNormal bannerList={homeData[1].items.slice(0,3)}/> : []}

      {homeData.map((item) => {
        if (item.name === EnumPosition.popular || item.name === EnumPosition.ranking) {
          return <div key={item.id} className={styles.mainContent}>
            <HomeTitle title={item.name}/>
            <FirstItem dataSource={item.items || []}/>
          </div>
        }
        return null
      })}

      { homeData.length === 0 && bannerList.length === 0 ? <div className={styles.mainContentEmpty}>
        <ImageCommon source={'/images/404/emptyBook.png'} className={styles.emptyImg}/>
        <div className={styles.emptyIntro}>
          <p>{t('others.noBook')}</p>
        </div>
      </div> : null}
    </div>
  )
}


export default MHome
