import React, { FC } from 'react'
import styles from '@/components/more/index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import HomeTitle from "@/components/home/homeTitle/HomeTitle";
import { EnumPosition, IBookItem } from "@/typings/home.interface";
import Link from "next/link";
import { MEmpty } from "@/components/common/empty";
import MorePagination from "@/components/more/pagination/MorePagination";
import FirstItem from "@/components/home/firstItem/FirstItem";

interface IProps {
  bookData: IBookItem[];
  pageNo: number;
  pages: number;
  position: EnumPosition;
}

const MMore: FC<IProps> = ({ bookData, position, pages, pageNo }) => {
  const { t } = useTranslation();

  return <div className={styles.moreWrap}>

    <div className={styles.crumbsBox}>
      <Link href="/" className={styles.crumbsActiveItem}>
        Home
      </Link>
      <ImageCommon source={'/images/home/pc-more.png'} className={styles.crumbsIcon}/>
      <div className={styles.crumbsItem}>{t(`menu.${position}`)}</div>
    </div>
    <HomeTitle title={t(`menu.${position}`)} isMore={false}/>
    {bookData.length > 0 ?
      <>
        <FirstItem dataSource={bookData}/>
        {pages && pages > 1 ? <MorePagination
          prevPath={`/more/${position}/`}
          page={pageNo}
          totalPage={pages}
        /> : null}
      </> : <MEmpty/> }
  </div>
}

export default MMore
