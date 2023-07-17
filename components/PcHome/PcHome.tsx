import styles from '@/components/PcHome/PcHome.module.css'
import React, { FC, useMemo } from "react";
import SecondList from "@/components/PcHome/secondList/SecondList";
import { EnumPosition, IBannerItem, IPageColumnsItem } from "typings/home.interface";
import SwiperArea from "@/components/PcHome/swiperArea/SwiperArea";
import PcHomeTitle from "@/components/PcHome/homeTitle/HomeTitle";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";

interface IProps {
  homeData: IPageColumnsItem[];
}

const PcHome: FC<IProps> = ({ homeData }) => {

  const { t } = useTranslation();
  const trendingData = homeData.find(item => item.name === EnumPosition.trending);

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
      {/*顶部*/}
      {trendingData.items.length > 0 ? <SwiperArea bannerList={trendingData.items.slice(0, 3)}/> : null}
      {
        bookList.length > 0 && bookList.map((item, index) => {
          if (item.name === EnumPosition.customInset || item.name === EnumPosition.popular) {
            return null;
          }
          if (item?.items && item.items.length > 0) {
            return <div key={item.id}>
              <PcHomeTitle title={item.name}/>
              <SecondList dataSource={(item.items || []).slice(0, 5)}/>
            </div>
          }
          return null;
        })
      }
      {bookList.length === 0 ? <div className={styles.mainContentEmpty}>
        <ImageCommon source={'/images/search/empty.png'} className={styles.emptyImg}/>
        <div className={styles.emptyIntro}>
          <p>{t('others.noBook')}</p>
        </div>
      </div> : null}
    </div>
  )
}

export default PcHome
