import Link from "next/link";
import styles from "@/components/common/Crumbs/index.module.scss";
import ImageCommon from "@/components/common/ImageCommon";
import React, { FC } from "react";
import { EnumPosition } from "typings/home.interface";
import { useAppSelector } from "@/store";

interface IProps {
  bookName: string;
  bookId?: string;
  chapterName?: string;
  isPc: boolean;
  position: EnumPosition | null;
}

const CrumbsCom: FC<IProps> = ({ position, bookName, bookId, chapterName, isPc }) => {

  const pos = useAppSelector(state => state.app.position);

  const _position = pos ?? position;
  return <div className={styles.crumbsWrapBox} style={!isPc ? { width: 0, height: 0, overflow: "hidden" } : {}}>
    <div className={styles.crumbsWrap}>
      <Link href="/" className={styles.crumbsItem}>
        首頁
        <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
      </Link>

      {_position && _position !== EnumPosition.排行榜 ? <Link href={`/more/${_position}/1`} className={styles.crumbsItem}>
        {EnumPosition[_position]}
        <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
      </Link> : null}

      {_position === EnumPosition.排行榜 ? <Link href={`/rankings`} className={styles.crumbsItem}>
        書籍排名
        <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
      </Link> : null}

      {chapterName && bookId ? <>
        <Link href={`/book/${bookId}`} className={styles.crumbsItem}>
          {bookName}
          <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
        </Link>
        <div className={styles.crumbsItemTxt}>{chapterName}</div>
      </> : <div className={styles.crumbsItemTxt}>{bookName}</div>}

    </div>
  </div>
}

export default CrumbsCom;
