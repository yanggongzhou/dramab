import React, { FC } from "react";
import SwiperNormal from "@/components/home/swiperNormal/SwiperNormal";
import HomeTitle from "@/components/home/homeTitle/HomeTitle";
import FirstItem from "@/components/home/firstItem/FirstItem";
import { IBookItem, IHomeResItem } from "@/typings/home.interface";
import styles from '@/components/home/MHome.module.scss'
import { MEmpty } from "@/components/common/empty";
import MFooter from "@/components/layout/mFooter/MFooter";

interface IProps {
  bigList: IBookItem[];
  smallData: IHomeResItem[];
}

const MHome: FC<IProps> = ({ bigList, smallData }) => {

  return (
    <>
      {bigList.length > 0 ? <SwiperNormal bigList={bigList}/> : null}

      {smallData.map((item) => {
        return <div key={item.id} className={styles.mainContent}>
          <HomeTitle title={item.name} subName={item.subName} href={`/more/${item.name}_${item.id}`}/>
          <FirstItem dataSource={item.items || []}/>
        </div>
      })}

      {bigList.length === 0 && smallData.length === 0 ? <MEmpty/> : null}

      <MFooter/>
    </>
  )
}


export default MHome
