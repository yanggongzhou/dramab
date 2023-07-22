import React, { FC } from 'react'
import styles from './HomeTitle.module.scss'
import Link from "next/link";
import Image from "next/image";

interface IProps {
  title: string;
  isMore?: boolean;
}

const HomeTitle: FC<IProps> = ({ title, isMore= true }) => {
  return <div className={styles.titleWrap}>
    <div className={styles.title}>
      <p>{title}</p>
      {isMore ? <Link className={styles.moreBox} href={`/more/${title}`}>
        <Image
          className={styles.moreIcon}
          width={32}
          height={32}
          src={'/images/layout/link.png'}
          placeholder="blur"
          blurDataURL={'/images/layout/link.png'}
          alt={'more'}
        />
      </Link> : null}
    </div>
    <p className={styles.titleSub}>What are you looking at？</p>
  </div>;
}

export default HomeTitle
