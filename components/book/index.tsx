import React, { FC, useState } from 'react'
import styles from "@/components/book/index.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import BookCrumbs from "@/components/book/crumbs";
import Image from "next/image";
import { onImgError } from "@/components/common/image/ImageCover";
import { IBookItem } from "@/typings/home.interface";
import { netIpUa } from "@/server/clientLog";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface IProps {
  bookInfo: IBookItem;
  isApple: boolean;
}

const MBook: FC<IProps> = ({ bookInfo, isApple }) => {
  const { t } = useTranslation();
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink = useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });
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
        blurDataURL={bookInfo.cover || '/images/defaultBook.png'}
        alt={bookInfo.bookName}
      />

      <h1 className={styles.bookName}>{bookName}</h1>

      <div className={styles.tagBox}>
        {(bookInfo?.tags || []).map(val => {
          return <div key={val} className={styles.tagItem}>{val}</div>
        })}
      </div>

      <div className={styles.footerBox}>
        <CopyToClipboard text={copyText} onCopy={() => {
          netIpUa(clipboard)
          // HiveLog.trackDownload('turnPage_click', { book_ID: bookId, chapter_id: chapterId })
        }}>
          <Link className={styles.footerBtn} href={shopLink}>
            <Image
              className={styles.playIcon}
              width={48}
              height={48}
              src={'/images/book/play-icon2.png'}
              alt={''}
            />
            <span>{t("home.play")}</span>
          </Link>
        </CopyToClipboard>
      </div>

      {introduction ? <div className={styles.introBox}>
        <p className={styles.introTitle}>{t('bookInfo.introduction')}</p>
        <p className={isShowMore ? styles.introTextMore : styles.introText}>{introduction}</p>
        {!isShowMore ? <div className={styles.introMore} onClick={() => onMore()}>{t('bookInfo.more')}</div> : null}
      </div> : null}

    </div>


  </>
}

export default MBook;
