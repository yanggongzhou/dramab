import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import Link from "next/link";
import Image from "next/image";

interface IProps {
  title: string;
  subName?: string;
  href?: string;
}

const HomeTitle: FC<IProps> = ({ title, subName = '', href }) => {
  return <div className={styles.titleWrap}>
    <div className={styles.title}>
      <p>{title}</p>
      {href ? <Link className={styles.moreBox} href={href}>
        <Image
          className={styles.moreIcon}
          width={32}
          height={32}
          src={'/images/layout/link.png'}
          alt={'more'}
        />
      </Link> : null}
    </div>
    <p className={styles.titleSub}>{subName}</p>
  </div>;
}

export default HomeTitle
