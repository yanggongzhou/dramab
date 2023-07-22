import React, { FC } from 'react'
import styles from '@/components/pcHome/homeTitle/HomeTitle.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IProps {
  title: string;
  href?: string;
  isMore?: boolean; // 是否显示跳转链接
  subName?: string;
}

const PcHomeTitle: FC<IProps> = ({ title, subName = '', href }) => {
  const { t } = useTranslation()
  return <div className={styles.titleWrap}>
    <div className={styles.titleBox}>
      <h2 className={styles.titleText}>{title}</h2>
      <div className={styles.titleSub}>{subName}</div>
    </div>

    {href ? <Link className={styles.moreBox} href={href}>
      {t('menu.SeeMore')}
      <Image
        className={styles.moreIcon}
        width={16}
        height={16}
        src={'/images/home/pc-more.png'}
        alt={''}
      />
      <Image
        className={styles.moreActiveIcon}
        width={16}
        height={16}
        src={'/images/home/pc-more-active.png'}
        alt={''}
      />
    </Link> : null}
  </div>
}

export default PcHomeTitle
