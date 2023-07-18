import React, { FC } from "react";
import styles from "@/components/pcBrowse/index.module.scss";
import Link from "next/link";
import { IBookItem } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import PaginationCom from "@/components/common/paginationCom";
import { IBrowseTypes } from "@/typings/browse.interface";
import { PcEmpty } from "@/components/common/empty";
import SecondList from "@/components/pcHome/secondList/SecondList";

interface IProps {
  bookList: IBookItem[];
  types: IBrowseTypes[];
  pageNo: number;
  pages: number;
  typeTwoId: number;
}

const PcBrowse: FC<IProps> = ({ bookList, pageNo, pages, typeTwoId, types }) => {
  const { t } = useTranslation();
  const activeItem = types.find(val => val.id === typeTwoId);
  const linkTypeTwoName = activeItem ? activeItem.replaceName : 'all';

  return <div className={styles.browseWrap}>

    <div className={styles.browseHeader}>
      <div className={styles.tabsBox}>
        {types.map((item) => {
          const typeName = item.id === 0 ? t('others.all') : item.name;
          if (item.id === typeTwoId) {
            return <div key={item.id} className={styles.tabItemActive}>{typeName}</div>
          }
          return <Link href={`/browse/${item.id}/${item.replaceName || item.name}`} key={item.id}
                       className={styles.tabItem}>
            {typeName}
          </Link>
        })}
      </div>
    </div>

    <div className={styles.browseContent}>
      {bookList.length === 0 ? <PcEmpty/> :
        <SecondList dataSource={bookList}/>}

      {pages && pages > 1 ?
        <PaginationCom
          path={`/browse/${typeTwoId}/${linkTypeTwoName}/`}
          pageNo={pageNo}
          totalPage={pages}
          isScroll={true}/> : null}
    </div>
  </div>
}

export default PcBrowse;
