import React, { FC } from 'react'
import styles from '@/components/pcMore/index.module.scss'
import PcHomeTitle from "@/components/pcHome/homeTitle/HomeTitle";
import { EnumPosition, IBookItem } from "@/typings/home.interface";
import PaginationCom from "@/components/common/paginationCom";
import Link from "next/link";
import SecondList from "@/components/pcHome/secondList/SecondList";
import { PcEmpty } from "@/components/common/empty";
import Image from "next/image";

interface IProps {
  bookData: IBookItem[];
  pageNo: number;
  pages: number;
  position: EnumPosition;
}

const PcMore: FC<IProps> = ({ bookData, position, pages, pageNo }) => {

  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <Link href={'/'} className={styles.backBoxLink}>
          <Image
            className={styles.backIcon}
            width={16}
            height={16}
            src={'/images/home/pc-more.png'}
            placeholder="blur"
            blurDataURL={'/images/home/pc-more.png'}
            alt={''}
          />
          <Image
            className={styles.backIconActive}
            width={16}
            height={16}
            src={'/images/home/pc-more-active.png'}
            placeholder="blur"
            blurDataURL={'/images/home/pc-more-active.png'}
            alt={''}
          />
          <span>Back</span>
        </Link>
      </div>
    </div>
    <div className={styles.moreContent}>
      <PcHomeTitle title={position} isMore={false}/>
      {bookData.length > 0 ? <div className={styles.moreBookList}>
        <SecondList dataSource={bookData} />
        {pages && pages > 1 ? <PaginationCom
          path={`/more/${position}/`}
          pageNo={pageNo}
          totalPage={pages}
          isScroll={true}
        /> : null}
      </div> : <PcEmpty/>}
    </div>
  </>
}

export default PcMore
