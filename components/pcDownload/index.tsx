import React, { FC } from "react";
import styles from '@/components/pcDownload/index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import PcStore from "@/components/pcDownload/store/PcStore";

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
      <ImageCommon source={'/images/download/pc-cover.png'} className={styles.downloadCover}/>
      <PcStore isApple={isApple} />
    </div>
  </div>
}

export default PcDownload;
