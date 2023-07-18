import React, { FC } from 'react'
import styles from '@/components/pcMore/index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import PcHomeTitle from "@/components/PcHome/homeTitle/HomeTitle";
import { EnumPosition, IBookItem } from "@/typings/home.interface";
import PaginationCom from "@/components/common/paginationCom";
import Link from "next/link";
import SecondList from "@/components/PcHome/secondList/SecondList";
import { PcEmpty } from "@/components/common/empty";

interface IProps {
  bookData: IBookItem[];
  pageNo: number;
  pages: number;
  position: EnumPosition;
}

const PcMore: FC<IProps> = ({ bookData, position, pages, pageNo }) => {
  const { t } = useTranslation();

  return <>
    <div className={styles.backBox}>
      <Link href={'/'} className={styles.backBoxLink}>
        <ImageCommon source={'/images/home/pc-more.png'} className={styles.backIcon}/>
        <ImageCommon source={'/images/home/pc-more-active.png'} className={styles.backIconActive}/>
        <span>Back</span>
      </Link>
    </div>
    <PcHomeTitle title={EnumPosition[position]} isMore={false}/>
    {bookData.length > 0 ? <div className={styles.moreBookList}>
      <SecondList dataSource={bookData} />
      {pages && pages > 1 ? <PaginationCom
        path={`/more/${position}/`}
        pageNo={pageNo}
        totalPage={pages}
        isScroll={true}
      /> : null}
    </div> : <PcEmpty/>}

  </>
}

export default PcMore
