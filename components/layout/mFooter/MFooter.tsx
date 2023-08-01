import React, { FC } from 'react'
import styles from '@/components/layout/mFooter/MFooter.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ClientConfig from "@/client.config";
import Image from "next/image";

interface IProps {
}

const MFooter: FC<IProps> = () => {
  const { t } = useTranslation();

  return <div className={styles.footerBox}>
    <Link href={'/privacy'} className={styles.agreementItem}>
      <span>{t('home.privacyPolicy')}</span>
      <Image
        className={styles.agreementIcon}
        width={24}
        height={24}
        src={'/images/layout/link.png'}
        alt={'more'}
      />
    </Link>
    <Link href={'/terms'} className={styles.agreementItem}>
      <span>{t('home.termsOfUse')}</span>
      <Image
        className={styles.agreementIcon}
        width={24}
        height={24}
        src={'/images/layout/link.png'}
        alt={'more'}
      />
    </Link>

    <div className={styles.footerContent}>
      <Image
        className={styles.logoBox}
        width={181}
        height={40}
        src={'/images/logo2.png'}
        placeholder="blur"
        blurDataURL={'/images/logo2.png'}
        alt={ClientConfig.name}
      />
      <Link className={styles.fmail} href={`mailto:${ClientConfig.email}`}>
        {t("home.email")}:{ ClientConfig.email }
      </Link>
      <p className={styles.fText}>{ClientConfig.companyName}</p>
      <p className={styles.fText}>© {ClientConfig.name}, {t('home.allRightsReserved')}</p>
    </div>
  </div>
}

export default MFooter
