import React, { FC } from 'react'
import styles from '@/components/pcMore/index.module.scss'
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import { IHomeResItem } from "@/typings/home.interface";
import PaginationCom from "@/components/common/paginationCom";
import Link from "next/link";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { PcEmpty } from "@/components/common/empty";
import Image from "next/image";

interface IProps {
  moreData: IHomeResItem;
  pageNo: number;
  pages: number;
}

const PcMore: FC<IProps> = ({ moreData, pages, pageNo }) => {

  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <Link href={'/'} className={styles.backBoxLink}>
          <Image
            className={styles.backIcon}
            width={16}
            height={16}
            src={'/images/home/pc-more.png'}
            alt={''}
          />
          <Image
            className={styles.backIconActive}
            width={16}
            height={16}
            src={'/images/home/pc-more-active.png'}
            alt={''}
          />
          <span>Back</span>
        </Link>
      </div>
    </div>
    <div className={styles.moreContent}>
      <PcHomeTitle title={moreData.name} subName={moreData.subName}/>
      {moreData?.items && moreData.items.length > 0 ? <div className={styles.moreBookList}>
        <SecondList dataSource={moreData.items} />
        {pages && pages > 1 ? <PaginationCom
          path={`/more/${moreData.name}_${moreData.id}/`}
          pageNo={pageNo}
          totalPage={pages}
          isScroll={true}
        /> : null}
      </div> : <PcEmpty/>}
    </div>
  </>
}

export default PcMore
