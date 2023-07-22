import React, { FC } from 'react'
import styles from '@/components/more/index.module.scss'
import { useTranslation } from "next-i18next";
import HomeTitle from "@/components/home/homeTitle/HomeTitle";
import { EnumPosition, IBookItem, IHomeResItem } from "@/typings/home.interface";
import Link from "next/link";
import { MEmpty } from "@/components/common/empty";
import MorePagination from "@/components/more/pagination/MorePagination";
import FirstItem from "@/components/home/firstItem/FirstItem";
import Image from "next/image";

interface IProps {
  moreData: IHomeResItem;
  pageNo: number;
  pages: number;
}

const MMore: FC<IProps> = ({ moreData, pages, pageNo }) => {
  const { t } = useTranslation();

  return <div className={styles.moreWrap}>

    <div className={styles.crumbsBox}>
      <Link href="/" className={styles.crumbsActiveItem}>
        Home
      </Link>
      <Image
        className={styles.crumbsIcon}
        width={16}
        height={16}
        src={'/images/home/pc-more.png'}
        alt={'>'}
      />
      <div className={styles.crumbsItem}>{moreData.name}</div>
    </div>
    <HomeTitle title={moreData?.name || ''} subName={moreData.subName} />
    {moreData.items && moreData.items.length > 0 ?
      <>
        <FirstItem dataSource={moreData.items}/>
        {pages && pages > 1 ? <MorePagination
          prevPath={`/more/${moreData.name}_${moreData.id}/`}
          page={pageNo}
          totalPage={pages}
        /> : null}
      </> : <MEmpty/> }
  </div>
}

export default MMore
