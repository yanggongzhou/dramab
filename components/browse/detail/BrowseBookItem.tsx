import { FC } from "react";
import styles from '@/components/Browse/detail/BrowseBookItem.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { IBookItem } from "typings/home.interface";
// import Rate from "@/components/Book/bookDetail/Rate";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface IProps {
  bookInfo: IBookItem;
  bookClick: () => void;
}

const BrowseBookItem: FC<IProps> = ({ bookInfo, bookClick }) => {
  const { t } = useTranslation()
  const {
    bookId,
    typeTwoName = 'all',
    replacedBookName,
    cover,
    bookName,
    introduction,
    author,
    viewCountDisplay,
    ratings = 0
  } = bookInfo;
  const routerToBook = `/book_info/${bookId}/${typeTwoName}/${replacedBookName}`
  const ratingStr = ratings.toFixed(1);
  return (<div className={styles.browseBookItem}>
    <Link href={routerToBook}>
      <ImageCommon w={180} h={238} source={cover} alt={bookName} className={styles.bookCover}/>
    </Link>
    <div className={styles.bookRight}>
      <div className={styles.bookTop}>
        <Link href={routerToBook} className={styles.bookName} onClick={() => bookClick()}>
          {bookName}
        </Link>
        <Link href={routerToBook} className={styles.bookAuthor} onClick={() => bookClick()}>
          {author}
        </Link>
        <Link href={routerToBook} className={styles.bookIntro} onClick={() => bookClick()}>
          {introduction}
        </Link>
      </div>

      <Link href={routerToBook}>
          <div className={styles.bookBottom}>
            <div className={styles.bookRatings}>
              <span className={styles.bookRatingsTxt}>{ratingStr}</span>
              {/*<Rate rate={ratings}/>*/}
            </div>
            <div className={styles.bookLine}/>
            <div className={styles.bookViewCount}>
              <span>{viewCountDisplay}</span>
              <span className={styles.bookView}>{t('menu.Views')}</span>
            </div>
          </div>
      </Link>
    </div>
  </div>)
}

export default BrowseBookItem;
