import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { EPositionShowName } from "@/typings/home.interface";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  title: string;
  isMore?: boolean;
}

const HomeTitle: FC<IProps> = ({ title, isMore= true }) => {
  const { t } = useTranslation()
  return <div className={styles.titleWrap}>
    <div className={styles.title}>
      <p>{title}</p>
      {isMore ? <Link className={styles.moreBox} href={`/more/${title}`}>
        <ImageCommon source={'/images/layout/link.png'} className={styles.moreIcon}/>
      </Link> : null}
    </div>
    <p className={styles.titleSub}>What are you looking at？</p>
  </div>;
}

export default HomeTitle
