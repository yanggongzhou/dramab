import React, { FC, useEffect } from "react";
import SwiperNormal from "@/components/Home/swiperNormal/SwiperNormal";
import HomeTitle from "@/components/Home/homeTitle/HomeTitle";
import ImageCommon from "@/components/common/ImageCommon";
import FirstItem from "@/components/Home/firstItem/FirstItem";
import BookList from "@/components/Home/bookList/BookList";
import { EnumPosition, IBannerItem, IPageColumnsItem, } from "@/typings/home.interface";
import styles from '@/components/Home/MHome.module.scss'
import RankColumn from "@/components/Home/rankColumn/RankColumn";
import { useTranslation } from "next-i18next";
import HomeHeader from "@/components/Home/homeHeader/HomeHeader";

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
      <HomeHeader/>

      { bannerList.length > 0 ? <SwiperNormal bannerList={bannerList}/> : []}

      {homeData.map((item) => {
        if (item.name === EnumPosition.banner) return null;

        if (item.name === EnumPosition.popular) {
          return <div key={item.id} className={styles.mainContent}>
            <div className={styles.itemWrap}>
              <HomeTitle title={item.name}/>
              <FirstItem dataSource={item.items || []}/>
            </div>
          </div>
        }
        if (item.name === EnumPosition.ranking) {
          return <div key={item.id} className={styles.mainContent}>
            <div className={styles.itemWrap}>
              <HomeTitle title={item.name}/>
              <RankColumn dataSource={item?.items || []}/>
            </div>
          </div>
        }

        return <div key={item.id} className={styles.mainContent}>
          <div className={styles.itemWrap}>
            <HomeTitle title={item.name}/>
            <BookList dataSource={item.items || []}/>
          </div>
        </div>
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
