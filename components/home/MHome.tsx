import React, { FC } from "react";
import SwiperNormal from "@/components/home/swiperNormal/SwiperNormal";
import HomeTitle from "@/components/home/homeTitle/HomeTitle";
import FirstItem from "@/components/home/firstItem/FirstItem";
import { EnumPosition, IBannerItem, IPageColumnsItem, } from "@/typings/home.interface";
import styles from '@/components/home/MHome.module.scss'
import { MEmpty } from "@/components/common/empty";
import MFooter from "@/components/layout/mFooter/MFooter";

interface IProps {
  bannerList: IBannerItem[];
  homeData: IPageColumnsItem[];
}

const MHome: FC<IProps> = ({ homeData, bannerList }) => {

  return (
    <>
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

      { homeData.length === 0 && bannerList.length === 0 ? <MEmpty/> : null}

      <MFooter/>
    </>
  )
}


export default MHome
