import React, { FC } from "react";
import Link from "next/link";
import styles from "@/components/common/Crumbs/index.module.scss";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  keyword: string;
  isPc: boolean;
}

const CrumbsTagCom: FC<IProps> = ({ isPc, keyword }) => {

  return <div className={styles.crumbsTagWrapBox} style={!isPc ? { height: 0, width: 0, overflow: "hidden" } : {}}>
    <div className={styles.crumbsWrap}>
      <Link href="/" className={styles.crumbsItem}>
        首页
        <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
      </Link>

      <Link href={`/keywords`} className={styles.crumbsItem}>
        关键词列表
        <ImageCommon source={'/images/common/book/crumbs.png'} className={styles.crumbsIcon}/>
      </Link>
      {keyword ? <div className={styles.crumbsItemTxt}>{keyword}</div> : null}
    </div>
  </div>
}

export default CrumbsTagCom;
