import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { EnumPosition, EPositionShowName } from "typings/home.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  title: EnumPosition;
  isMore?: boolean; // 是否显示跳转链接
}

const PcHomeTitle: FC<IProps> = ({ title, isMore = true}) => {
  const { t } = useTranslation()
  return <div className={styles.titleWrap}>
    <div className={styles.titleBox}>
      <h2 className={styles.titleText}>{t(`menu.popular`)}</h2>
      <div className={styles.titleSub}>
        What are you looking at？
      </div>
    </div>

    {isMore ? <Link className={styles.moreBox} href={`/more/${title}`}>
      {t('menu.SeeMore')}
      <ImageCommon
        source={'/images/home/pc-more.png'}
        className={styles.moreIcon}/>
      <ImageCommon
        source={'/images/home/pc-more-active.png'}
        className={styles.moreActiveIcon}/>
    </Link> : null}
  </div>
}

export default PcHomeTitle
