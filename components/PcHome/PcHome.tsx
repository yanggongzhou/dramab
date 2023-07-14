import styles from '@/components/PcHome/PcHome.module.css'
import React, { FC, useMemo } from "react";
import SecondItem from "@/components/PcHome/secondItem/SecondItem";
import RankColumn1 from "@/components/PcHome/rankColumn1/RankColumn1";
import RankColumn3 from "@/components/PcHome/rankColumn3/RankColumn3";
import { EnumPosition, IBannerItem, IPageColumnsItem } from "typings/home.interface";
import PcSwiperNormal from "@/components/PcHome/swiperNormal/SwiperNormal";
import PcFirstItem from "@/components/PcHome/firstItem/FirstItem";
import PcHomeTitle from "@/components/PcHome/homeTitle/HomeTitle";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";

interface IProps {
  bannerList: IBannerItem[];
  homeData: IPageColumnsItem[];
}

const PcHome: FC<IProps> = ({ homeData, bannerList }) => {

  const { t } = useTranslation();

  const bookList = useMemo<IPageColumnsItem[]>(() => {
    const rankingData = homeData.find(item => item.name === EnumPosition.ranking);
    const trendingData = homeData.find(item => item.name === EnumPosition.trending);
    let isInset = false;
    const bookData = homeData.map(item => {
      if ((item.name === EnumPosition.ranking || item.name === EnumPosition.trending) && !isInset) {
        isInset = true;
        return {
          ...item,
          name: EnumPosition.customInset,
          columns: [trendingData, rankingData]
        }
      }
      return item;
    });

    return bookData.filter(item => !([EnumPosition.trending, EnumPosition.ranking, EnumPosition.banner].includes(item.name))) as IPageColumnsItem[]
  }, [homeData]);

  return (
    <div className={styles.container}>
      {/*顶部搜索背景块*/}
      {bannerList.length > 0 ? <PcSwiperNormal bannerList={bannerList}/> : null}
      {
        bookList.length > 0 && bookList.map((item, index) => {
          if (item.name === EnumPosition.popular) {
            if (item?.items && item.items.length > 0) {
              return <div key={item.id} className={styles.mainContent}>
                <div className={styles.itemWrap}>
                  <PcHomeTitle title={item.name}/>
                  <PcFirstItem dataSource={item.items || []}/>
                </div>
              </div>
            }
            return null;
          }

          if (item.name === EnumPosition.customInset) {
            const trending = item.columns.find(val => val && val.name === EnumPosition.trending);
            const ranking = item.columns.find(val => val && val.name === EnumPosition.ranking);

            return <div key={item.id} className={styles.mainRankContent}>
              {trending && trending.items.length > 0 ? <div>
                <PcHomeTitle title={trending.name}/>
                <RankColumn1 dataSource={trending.items.slice(0, 5)}/>
              </div> : null}
              {ranking && ranking?.items?.length > 0 ? <div className={styles.mainContent4}>
                <PcHomeTitle title={ranking.name}/>
                <RankColumn3 dataSource={ranking.items.slice(0, 3)}/>
              </div> : null}
            </div>
          }

          if (item?.items && item.items.length > 0) {
            return <div key={item.id} style={index % 2 === 0 ? { backgroundColor: '#F5F6FA' } : {}}>
              <div className={styles.itemWrap}>
                <PcHomeTitle title={item.name}/>
                <SecondItem dataSource={item.items || []}/>
              </div>
            </div>
          }
          return null;
        })
      }
      {bookList.length === 0 && bannerList.length === 0 ? <div className={styles.mainContentEmpty}>
        <ImageCommon source={'/images/search/empty.png'} className={styles.emptyImg}/>
        <div className={styles.emptyIntro}>
          <p>{t('others.noBook')}</p>
        </div>
      </div> : null}
    </div>
  )
}

export default PcHome
