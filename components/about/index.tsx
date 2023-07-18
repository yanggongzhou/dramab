import React, { FC } from "react";
import styles from '@/components/MAbout/index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import BackHeader from "@/components/common/BackHeader";
import { useTranslation } from "next-i18next";

interface IProps {
}

const MAbout: FC<IProps> = () => {
  const { t } = useTranslation('aboutUs');
  return <div className={styles.aboutWrap}>
    <BackHeader />
    <div className={styles.aboutContent}>
      <ImageCommon source={'/images/about/aboutBg1.png'} className={styles.aboutHeaderBg1}/>
      <ImageCommon source={'/images/about/aboutBg2.png'} className={styles.aboutHeaderBg2}/>
      <div className={styles.aboutHeader}>
        <h3 className={styles.title}>{t('aboutTitle')}</h3>
        <p>{t('aboutContent1')}</p>
        <p>{t('aboutContent2')}</p>
        <p>{t('aboutContent3')}</p>
        <p>{t('aboutContent4')}</p>
        <p>{t('aboutContent5')}</p>
        <p>{t('aboutContent6')}</p>
      </div>
    </div>
  </div>
}

export default MAbout;
