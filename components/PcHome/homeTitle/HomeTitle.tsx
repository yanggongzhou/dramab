import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { EnumPosition, EPositionShowName } from "typings/home.interface";
import { useTranslation } from "next-i18next";

interface IProps {
  title: EnumPosition;
  isMore?: Boolean;
  isSeo?: Boolean;
}

const PcHomeTitle: FC<IProps> = ({ title, isMore = true, isSeo }) => {
  const { t } = useTranslation()
  const TitleItem = () => (
    <div className={styles.titleWrap}>
      <div className={styles.title}>
        <div className={styles.titleTip}/>
        {isSeo ? <h1 className={styles.titleText}>{t(`menu.${EPositionShowName[title]}`)}</h1> :
          <h2 className={styles.titleText}>{t(`menu.${EPositionShowName[title]}`)}</h2>}
      </div>
      {isMore &&
      <div className={styles.moreBox}>
        {t('menu.SeeMore')}
        <ImageCommon
          source={'/images/home/pc-more.png'}
          className={styles.moreIcon}/>
      </div>
      }
    </div>
  )
  const isRankings = title === EnumPosition.ranking
  if (isMore) {
    return <Link href={isRankings ? '/rankings' : `/more/${EPositionShowName[title]}`}>
        <TitleItem/>
    </Link>;
  } else {
    return <TitleItem/>
  }
}

export default PcHomeTitle
