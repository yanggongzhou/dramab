import React, { FC } from "react";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { IBookItem, IHomeResItem } from "@/typings/home.interface";
import SwiperArea from "@/components/pcHome/swiperArea/SwiperArea";
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import { PcEmpty } from "@/components/common/empty";

interface IProps {
  bigList: IBookItem[];
  smallData: IHomeResItem[];
}

const PcHome: FC<IProps> = ({ bigList, smallData }) => {

  return (
    <>
      {bigList.length > 0 ? <SwiperArea bigList={bigList}/> : null}
      {
        smallData.length > 0 && smallData.map((item, index) => {
          if (item?.items && item.items.length > 0) {
            return <div key={item.id}>
              <PcHomeTitle title={item.name} subName={item.subName} href={`/more/${encodeURIComponent(item.name)}_${item.id}`}/>
              <SecondList dataSource={(item.items || []).slice(0, 5)} priority={index <= 1}/>
            </div>
          }
          return null;
        })
      }
      {smallData.length === 0 ? <PcEmpty/> : null}
    </>
  )
}

export default PcHome
