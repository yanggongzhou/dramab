import React, { FC } from 'react'
import styles from '@/components/layout/mFooter/MFooter.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
}

const MFooter: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.footerBox}>
    <Link href={'/privacy'} className={styles.agreementItem}>
      <span>{t('banner.PrivacyPolicy')}</span>
      <ImageCommon className={styles.agreementIcon} source={'/images/layout/link.png'}/>
    </Link>
    <Link href={'/terms'} className={styles.agreementItem}>
      <span>{t('banner.TermsOfUse')}</span>
      <ImageCommon className={styles.agreementIcon} source={'/images/layout/link.png'}/>
    </Link>

    <div className={styles.footerContent}>

      <ImageCommon className={styles.logoBox} source={'/images/logo2.png'} alt={ClientConfig.name}/>
      <Link className={styles.fmail} href={`mailto:${ClientConfig.email}`}>
        Email:{ ClientConfig.email }
      </Link>
      <p className={styles.fText}>{ClientConfig.companyName}</p>
      <p className={styles.fText}>© {ClientConfig.name}, {t('banner.AllRightsReserved')}</p>

    </div>
  </div>
}

export default MFooter
