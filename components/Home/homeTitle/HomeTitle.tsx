import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { EPositionShowName } from "@/typings/home.interface";

interface IProps {
  title: string;
  isMore?: Boolean;
}

const HomeTitle: FC<IProps> = ({ title, isMore = true }) => {
  const { t } = useTranslation()

  const TitleItem = () => (
    <div className={styles.titleWrap}>
      <div className={styles.title}>
        <span>{t('menu.' + EPositionShowName[title])}</span>
      </div>
      {isMore &&
      <div className={styles.moreBox}>
        {t('menu.SeeMore')}
      </div>
      }
    </div>
  )
  if (isMore) {
    return <Link href={`/more/${EPositionShowName[title]}`}>
      <TitleItem/>
    </Link>;
  } else {
    return <TitleItem/>
  }
}

export default HomeTitle
