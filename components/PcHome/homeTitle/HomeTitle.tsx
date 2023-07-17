import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { EnumPosition, EPositionShowName } from "typings/home.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  title: EnumPosition;
}

const PcHomeTitle: FC<IProps> = ({ title}) => {
  const { t } = useTranslation()
  return <div className={styles.titleWrap}>
    <div className={styles.titleBox}>
      <h2 className={styles.titleText}>{t(`menu.${EPositionShowName[title]}`)}</h2>
      <div className={styles.titleSub}>
        What are you looking at？
      </div>
    </div>

    <Link className={styles.moreBox} href={`/more/${EPositionShowName[title]}`}>
        {t('menu.SeeMore')}
        <ImageCommon
          source={'/images/home/pc-more.png'}
          className={styles.moreIcon}/>
      <ImageCommon
        source={'/images/home/pc-more-active.png'}
        className={styles.moreActiveIcon}/>
    </Link>
  </div>
}

export default PcHomeTitle
