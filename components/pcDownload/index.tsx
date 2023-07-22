import React, { FC } from "react";
import styles from '@/components/pcDownload/index.module.scss';
import { useTranslation } from "next-i18next";
import PcStore from "@/components/pcDownload/store/PcStore";
import Image from "next/image";

interface IProps {
  isApple: boolean;
}

const PcDownload: FC<IProps> = ({ isApple }) => {
  const { t } = useTranslation('aboutUs');

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHeader}>
      <h3 className={styles.downloadTitle}>DramaBox | {t('aboutTitle')}</h3>
      <div className={styles.downloadContent}>
        <p>{t('aboutContent1')}</p>
        <p>{t('aboutContent2')}</p>
        <p>{t('aboutContent3')}</p>
        <p>{t('aboutContent4')}</p>
        <p>{t('aboutContent5')}</p>
        <p>{t('aboutContent6')}</p>
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
