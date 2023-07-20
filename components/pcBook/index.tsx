import React, { FC } from 'react'
import styles from "@/components/pcBook/index.module.scss";
import { IBook } from "typings/book.interface";
import Link from "next/link";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import useHiveLog from "@/hooks/useHiveLog";
import { useRouter } from "next/navigation";

interface IProps {
  bookInfo: IBook;
  firstChapterId: string;
}

const PcBook: FC<IProps> = ({ bookInfo, firstChapterId }) => {

  const { t } = useTranslation()
  const HiveLog = useHiveLog();
  const {
    replacedBookName = 'null',
    typeTwoName = 'all'
  } = bookInfo;
  const toRead = () => {
    // 书籍详情点击进入阅读
    HiveLog.track('BookDetails_ClickRead', {
      book_ID: bookInfo.bookId,
      book_name: bookInfo.bookName,
    })
  }
  const routerToBook = `/book_info/${bookInfo.bookId}/${typeTwoName}/${replacedBookName}`;

  const router = useRouter();

  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <div className={styles.backBoxLink} onClick={() => {
          router.back();
        }}>
          <ImageCommon source={'/images/home/pc-more.png'} className={styles.backIcon}/>
          <ImageCommon source={'/images/home/pc-more-active.png'} className={styles.backIconActive}/>
          <span>Back</span>
        </div>
      </div>
    </div>

    <div className={styles.detailBox}>
      <ImageCommon w={240} h={320} source={bookInfo.cover} className={styles.detailBookCover} alt={bookInfo.bookName}/>

      <div className={styles.detailBoxRight}>
        <div className={styles.detailBoxRightTop}>
          <Link href={routerToBook}>
            <h1 className={styles.bookName}>{bookInfo.bookName}</h1>
          </Link>
          <Link href={routerToBook} className={styles.viewCount}>
            {bookInfo.viewCountDisplay} Episodes
          </Link>

          <Link href={routerToBook} className={styles.intro}>
            {bookInfo.introduction}
          </Link>

          <div className={styles.tagsContent}>
            { ['Film', 'Series', 'Dramas', 'Documentaries'].map(val => {
              return <Link key={val} href={routerToBook} className={styles.tagItem}>{val}</Link>
            })}
          </div>
        </div>

        <Link href={`/book/${replacedBookName}_${bookInfo.bookId}/Chapter-1_${firstChapterId}`} className={styles.playBtn} onClick={() => toRead()}>
          <ImageCommon source={'/images/book/play-icon.png'} className={styles.playIcon}/>
          <span>Play Now</span>
        </Link>
      </div>
    </div>

  </>
}

export default PcBook;
