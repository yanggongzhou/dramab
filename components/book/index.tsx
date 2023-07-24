import React, { FC, useState } from 'react'
import styles from "@/components/book/index.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import useHiveLog from "@/hooks/useHiveLog";
import BookCrumbs from "@/components/book/crumbs";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem } from "@/typings/home.interface";

interface IProps {
  bookInfo: IBookItem;
  firstChapterId: string;
}

const MBook: FC<IProps> = ({ bookInfo, firstChapterId}) => {
  const { t } = useTranslation();
  const HiveLog = useHiveLog();
  const {
    cover,
    bookName,
    ratings = 0,
    viewCountDisplay = '',
    introduction
  } = bookInfo;

  const [isShowMore, setIsShowMore] = useState(false);
  const onMore = () => {
    setIsShowMore(true)
  }
  const toRead = () => {
    // 书籍详情点击进入阅读
    HiveLog.track('BookDetails_ClickRead', {
      book_ID: bookInfo.bookId,
      book_name: bookInfo.bookName,
    })
  }

  return <>
    <BookCrumbs bookInfo={bookInfo}/>

    <div className={styles.detailBox}>
      <Image
        onError={onImgError}
        className={styles.bookCover}
        width={280}
        height={378}
        src={bookInfo.cover}
        placeholder="blur"
        blurDataURL={bookInfo.cover}
        alt={bookInfo.bookName}
      />

      <h1 className={styles.bookName}>{bookName}</h1>

      <div className={styles.tagBox}>
        { ['Film', 'Series', 'Dramas', 'Documentaries'].map(val => {
          return <div key={val} className={styles.tagItem}>{val}</div>
        })}
      </div>

      <div className={styles.footerBox}>
        <Link href={`/book/${bookInfo.replacedBookName}_${bookInfo.bookId}/Chapter-1_${firstChapterId}`} className={styles.footerBtn} onClick={toRead}>
          <Image
            className={styles.playIcon}
            width={48}
            height={48}
            src={'/images/book/play-icon2.png'}
            alt={''}
          />
          <span>Play Now</span>
        </Link>
      </div>

      {introduction ? <div className={styles.introBox}>
        <p className={styles.introTitle}>{t('bookInfo.Introduction')}</p>
        <p className={isShowMore ? styles.introTextMore : styles.introText}>{introduction}</p>
        {!isShowMore ? <div className={styles.introMore} onClick={() => onMore()}>{t('bookInfo.More')}</div> : null}
      </div> : null}

    </div>


  </>
}

export default MBook;
