import Link from "next/link";
import styles from "@/components/common/BackHeader/index.module.css";
import ImageCommon from "@/components/common/ImageCommon";
import React, { FC } from "react";

interface IProps {
}

const BackHeader: FC<IProps> = () => {
  return <Link href={'/'} className={styles.backBox}>
    <ImageCommon source={'/images/common/search/backIcon.png'} className={styles.backIcon}/>
    <span>返迴</span>
  </Link>
}

export default BackHeader;
