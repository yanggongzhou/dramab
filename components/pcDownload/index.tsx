import React, { FC } from "react";
import styles from '@/components/pcDownload/index.module.scss';
import { useTranslation } from "next-i18next";
import PcStore from "@/components/pcDownload/store/PcStore";
import Image from "next/image";

interface IProps {
  isApple: boolean;
}

const PcDownload: FC<IProps> = ({ isApple }) => {
  const { t } = useTranslation();

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHeader}>
      <h3 className={styles.downloadTitle}>DramaBox | Make short dramas Fantastic</h3>
      <div className={styles.downloadContent}>
        Free online website novels & books for fiction lovers.
        Popular web novels with massive original English stories, types include urban, romance，fantasy，werewolf，classic and so on.
        For more high-quality content and experience, you can download the Webfic official app and enjoy the fun of reading together.
        Download it now and enjoy reading together.
      </div>
    </div>

    <div className={styles.downloadMain}>
      <Image
        className={styles.downloadCover}
        width={440}
        height={440}
        src={'/images/download/pc-cover.png'}
        placeholder="blur"
        blurDataURL={'/images/download/pc-cover.png'}
        alt={''}
      />
      <PcStore isApple={isApple} />
    </div>
  </div>
}

export default PcDownload;
