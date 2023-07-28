import React, { FC } from 'react'
import styles from "@/components/pcBook/index.module.scss";
import Link from "next/link";
import useHiveLog from "@/hooks/useHiveLog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  bookInfo: IBookItem;
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
    // HiveLog.track('BookDetails_ClickRead', {
    //   book_ID: bookInfo.bookId,
    //   book_name: bookInfo.bookName,
    // })
  }
  const routerToBook = `/download?${bookInfo.bookId}`;

  const router = useRouter();

  return <>
    <div className={styles.backHead}>
      <div className={styles.backBox}>
        <div className={styles.backBoxLink} onClick={() => {
          router.back();
        }}>
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
          <span>{t("home.back")}</span>
        </div>
      </div>
    </div>

    <div className={styles.detailBox}>
      <Image
        onError={onImgError}
        className={styles.detailBookCover}
        width={450}
        height={600}
        src={bookInfo.cover}
        placeholder="blur"
        blurDataURL={bookInfo.cover || '/images/defaultBook.png'}
        alt={bookInfo.bookName}
      />

      <div className={styles.detailBoxRight}>
        <div className={styles.detailBoxRightTop}>
          <Link href={routerToBook}>
            <h1 className={styles.bookName}>{bookInfo.bookName}</h1>
          </Link>
          <Link href={routerToBook} className={styles.viewCount}>
            {`${bookInfo.viewCountDisplay} ${t("home.episodes")}`}
          </Link>

          <Link href={routerToBook} className={styles.intro}>
            {bookInfo.introduction}
          </Link>

          <div className={styles.tagsContent}>
            { (bookInfo?.tags || []).map(val => {
              return <Link key={val} href={routerToBook} className={styles.tagItem}>{val}</Link>
            })}
          </div>
        </div>

        <Link href={`/download?${bookInfo.bookId}`} className={styles.playBtn} onClick={() => toRead()}>
          <Image
            className={styles.playIcon}
            width={16}
            height={16}
            src={'/images/book/play-icon.png'}
            alt={''}
          />
          <span>{t("home.play")}</span>
        </Link>
      </div>
    </div>

  </>
}

export default PcBook;
