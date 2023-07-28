import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import styles from '@/components/common/empty/index.module.scss'
import Image from "next/image";

export const PcEmpty: FC = () => {
  const { t } = useTranslation();

  return <div className={styles.emptyBox}>
    <Image
      className={styles.emptyIcon}
      width={320}
      height={240}
      src={'/images/common/empty.png'}
      placeholder="blur"
      blurDataURL={'/images/common/empty.png'}
      alt={t('home.emptyDesc')}
    />
    <div className={styles.emptyIntro}>
      {t('home.emptyDesc')}
    </div>
  </div>
}

export const MEmpty: FC = () => {
  const { t } = useTranslation();
  return <div className={styles.mEmptyBox}>
    <Image
      className={styles.emptyIcon}
      width={320}
      height={240}
      src={'/images/common/empty.png'}
      placeholder="blur"
      blurDataURL={'/images/common/empty.png'}
      alt={t('home.emptyDesc')}
    />
    <div className={styles.emptyIntro}>
      {t('home.emptyDesc')}
    </div>
  </div>
}
