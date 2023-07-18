import React, { FC } from "react";
import styles from "@/components/pcBrowse/index.module.scss";
import Link from "next/link";
import { IBookItem } from "@/typings/home.interface";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import PcBrowseRate from "@/components/PcBrowse/detail/PcBrowseRate";
import PaginationCom from "@/components/common/paginationCom";
import { IBrowseTypes } from "@/typings/browse.interface";

interface IProps {
  bookList: IBookItem[];
  types: IBrowseTypes[];
  pageNo: number;
  pages: number;
  typeTwoId: number;
  bookClick: () => void;
}

const PcBrowse: FC<IProps> = ({ bookList, pageNo, pages, typeTwoId, types, bookClick }) => {
  const { t } = useTranslation();
  const activeItem = types.find(val => val.id === typeTwoId);
  const typeTwoName = activeItem ? (activeItem.name === 'all' ? t('others.all') : activeItem.name) : '';
  const linkTypeTwoName = activeItem ? activeItem.replaceName : 'all';

  return <div className={styles.browseWrap}>

    <div className={styles.browseHeader}>
      <div className={styles.tabsBox}>
        { types.map((item) => {
          const typeName = item.id === 0 ? t('others.all') : item.name;
          if (item.id === typeTwoId) {
            return <div key={item.id}  className={styles.tabItemActive}>{typeName}</div>
          }
          return <Link href={`/browse/${item.id}/${item.replaceName || item.name}`} key={item.id} className={styles.tabItem}>
            {typeName}
          </Link>
        }) }
      </div>
    </div>


    {/*<div className={styles.browseRight}>*/}
    {/*  <div style={{ width: '100%' }}>*/}
    {/*    <h1 className={styles.rightTitle}>{typeTwoName}</h1>*/}
    {/*    {bookList.length === 0 ? <div className={styles.mainContentEmpty}>*/}
    {/*      <ImageCommon source={'/images/search/empty.png'} className={styles.emptyImg}/>*/}
    {/*      <div className={styles.emptyIntro}>*/}
    {/*        <p>{t('others.noBook')}</p>*/}
    {/*      </div>*/}
    {/*    </div> : <div className={styles.rightBox}>*/}
    {/*      { bookList.map((book) => {*/}
    {/*        const { bookId, replacedBookName, cover, bookName, introduction, author, viewCountDisplay, ratings = 0 } = book;*/}
    {/*        const ratingStr = ratings.toFixed(1)*/}
    {/*        const routerToBook = `/book_info/${bookId}/${book.typeTwoName || linkTypeTwoName || 'all'}/${replacedBookName}`*/}
    {/*        return <div key={bookId} className={styles.rightItem}>*/}
    {/*          <Link href={routerToBook}>*/}
    {/*              <ImageCommon w={150} h={200} source={cover} className={styles.bookCover} alt={bookName}/>*/}
    {/*          </Link>*/}
    {/*          <div className={styles.bookOther}>*/}
    {/*            <div>*/}
    {/*              <Link href={routerToBook} className={styles.bookName}>*/}
    {/*                {bookName}*/}
    {/*              </Link>*/}
    {/*              <Link href={routerToBook} className={styles.bookAuthor}>*/}
    {/*                {t('others.by')}: {author}*/}
    {/*              </Link>*/}
    {/*              <Link href={routerToBook} className={styles.bookRate} onClick={() => bookClick()}>*/}
    {/*                  <PcBrowseRate rate={ratings}/>*/}
    {/*                  <span className={styles.bookRateTxt}>{ ratingStr }</span>*/}
    {/*              </Link>*/}
    {/*              <Link href={routerToBook} className={styles.bookViewCount} onClick={() => bookClick()}>*/}
    {/*                  <span>{viewCountDisplay} </span> {t('menu.Views')}*/}
    {/*              </Link>*/}
    {/*            </div>*/}
    {/*            <Link href={routerToBook} className={styles.bookIntro} onClick={() => bookClick()}>*/}
    {/*              {introduction}*/}
    {/*            </Link>*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*      })}*/}
    {/*    </div>}*/}
    {/*  </div>*/}
    {/*  {pages && pages > 1 ? <div className={styles.browsePagination}>*/}
    {/*    <PaginationCom*/}
    {/*      path={`/browse/${typeTwoId}/${linkTypeTwoName}/`}*/}
    {/*      pageNo={pageNo}*/}
    {/*      totalPage={pages}*/}
    {/*      isScroll={true}/>*/}
    {/*  </div> : null}*/}
    {/*</div>*/}
  </div>
}

export default PcBrowse;
