import React, { FC, useEffect, useRef, useState } from "react";
import styles from "@/components/browse/index.module.scss";
import { IBookItem } from "typings/home.interface";
import { useTranslation } from "next-i18next";
import { Tabs } from "antd-mobile";
import Link from "next/link";
import MorePagination from "@/components/more/pagination/MorePagination";
import DropMenu from "@/components/browse/detail/DropMenu";
import { IBrowseTypes } from "@/typings/browse.interface";
import { useRouter } from "next/router";
import { MEmpty } from "@/components/common/empty";
import FirstItem from "@/components/home/firstItem/FirstItem";

interface IProps {
  bookList: IBookItem[];
  types: IBrowseTypes[];
  pageNo: number;
  pages: number;
  typeTwoId: number;
  bookClick: () => void;
}

const MBrowse: FC<IProps> = ({ bookList, pageNo, pages, typeTwoId, types }) => {
  const { t } = useTranslation()
  const browseRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (browseRef.current) {
      browseRef.current.scrollTop = 0
    }
  }, [router])

  const activeItem = types.find(val => val.id === typeTwoId);
  const linkTypeTwoName = activeItem ? activeItem.replaceName : 'all';
  const [visible, setVisible] = useState(false);

  return (<div className={styles.browseBox} id='browse_box'>

    <div className={styles.tabBox}>
      <Tabs
        className={styles.tabContent}
        activeLineMode={'fixed'}
        activeKey={String(typeTwoId)}
      >
        {types.map((item) => {
          const typeName = item.id === 0 ? t('others.all') : item.name;
          return <Tabs.Tab title={<Link href={`/browse/${item.id}/${item.replaceName || encodeURIComponent(item.name) || 'all'}`}>
              {typeName}
            </Link>}
            key={item.id}/>
        })}
      </Tabs>
      <DropMenu visible={visible} types={types} typeTwoId={typeTwoId}/>
    </div>

    {bookList.length > 0 ? <div className={styles.browseContent}>
      <div className={styles.browseContent2} ref={browseRef}>
        <FirstItem dataSource={bookList} />
        {pages && pages > 1 ? <MorePagination
          prevPath={`/browse/${typeTwoId}/${linkTypeTwoName}/`}
          page={pageNo}
          totalPage={pages}
        /> : null}
      </div>
    </div> : <MEmpty />}
  </div>)
}

export default MBrowse;
