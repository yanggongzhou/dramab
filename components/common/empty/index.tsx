import React, { FC } from "react";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import styles from '@/components/common/empty/index.module.scss'

export const PcEmpty: FC = () => {
  const { t } = useTranslation();

  return <div className={styles.emptyBox}>
    <ImageCommon source={'/images/common/empty.png'} className={styles.emptyIcon} alt={'No Content'}/>
    <div className={styles.emptyIntro}>
      {t('others.noBook')}
    </div>
  </div>
}

export const MEmpty: FC = () => {
  const { t } = useTranslation();
  return <div className={styles.mEmptyBox}>
    <ImageCommon source={'/images/common/empty.png'} className={styles.emptyIcon} alt={'No Content'}/>
    <div className={styles.emptyIntro}>
      {t('others.noBook')}
    </div>
  </div>
}
