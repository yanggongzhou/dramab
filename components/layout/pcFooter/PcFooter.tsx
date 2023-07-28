import React, { FC } from 'react'
import styles from '@/components/layout/pcFooter/PcFooter.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";

interface IProps {
}

const PcFooter: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.footerWrap}>
    <div className={styles.footerContent}>

      <div className={styles.footerText}>
        <p className={styles.fText}>© {ClientConfig.name}, {t('home.allRightsReserved')}</p>
        <Link className={styles.fmail} href={`mailto:${ClientConfig.email}`}>
          Email:{ ClientConfig.email }
        </Link>
        <p className={styles.fText}>{ClientConfig.companyName}</p>
      </div>

      <div className={styles.footerLink}>
        <Link href={'/terms'} className={styles.otherBtn}>
          {t('home.termsOfUse')}
        </Link>
        <Link href={'/privacy'} className={styles.otherBtn}>
          {t('home.privacyPolicy')}
        </Link>
      </div>
    </div>
  </div>
}

export default PcFooter
