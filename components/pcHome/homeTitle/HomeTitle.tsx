import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import Link from "next/link";
import { EnumPosition } from "typings/home.interface";
import { useTranslation } from "next-i18next";
import Image from "next/image";

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
      <Image
        className={styles.moreIcon}
        width={16}
        height={16}
        src={'/images/home/pc-more.png'}
        placeholder="blur"
        blurDataURL={'/images/home/pc-more.png'}
        alt={''}
      />
      <Image
        className={styles.moreActiveIcon}
        width={16}
        height={16}
        src={'/images/home/pc-more-active.png'}
        placeholder="blur"
        blurDataURL={'/images/home/pc-more-active.png'}
        alt={''}
      />
    </Link> : null}
  </div>
}

export default PcHomeTitle
