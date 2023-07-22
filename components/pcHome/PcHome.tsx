import React, { FC, useMemo } from "react";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { EnumPosition, IPageColumnsItem } from "typings/home.interface";
import SwiperArea from "@/components/pcHome/swiperArea/SwiperArea";
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import { PcEmpty } from "@/components/common/empty";

interface IProps {
  homeData: IPageColumnsItem[];
}

const PcHome: FC<IProps> = ({ homeData }) => {

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
    <>
      {trendingData && trendingData?.items?.length > 0 ? <SwiperArea bannerList={trendingData.items.slice(0, 3)}/> : null}
      {
        bookList.length > 0 && bookList.map((item, index) => {
          if (item.name === EnumPosition.customInset || item.name === EnumPosition.popular) {
            return null;
          }
          if (item?.items && item.items.length > 0) {
            return <div key={item.id}>
              <PcHomeTitle title={item.name}/>
              <SecondList dataSource={(item.items || []).slice(0, 5)} index={index <= 1}/>
            </div>
          }
          return null;
        })
      }
      {bookList.length === 0 ? <PcEmpty/> : null}
    </>
  )
}

export default PcHome
