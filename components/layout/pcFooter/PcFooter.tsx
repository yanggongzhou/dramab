import React, { FC } from 'react'
import styles from '@/components/layout/pcFooter/PcFooter.module.scss'
import Link from "next/link";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Toast } from "antd-mobile";
import { ELanguage } from "@/typings/home.interface";
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";

interface IProps {
}

const PcFooter: FC<IProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const copyUrl = useAppSelector(state => {
    const bookId = state.hive.clipboard.bid;
    const locale = state.hive.language;
    if (state.hive.language === ELanguage.English) {
      return `${process.env.WebDomain}/download_apps?bookId=${bookId}&path=${process.env.WebDomain + router.asPath}`
    }
    return `${process.env.WebDomain}/${locale}/download_apps?bookId=${bookId}&path=${process.env.WebDomain + '/' + locale + router.asPath}`;
  });

  return <div className={styles.footerWrap}>
    <div className={styles.footerContent}>
      <div className={styles.footerLink}>

        <CopyToClipboard text={copyUrl} onCopy={() => {
          Toast.show(t('footer.copied'))
        }}>
          <div className={styles.copyBtn}>
            <ImageCommon className={styles.copyBtnIcon} source={'/images/home/copyIcon.png'}/>
            {t('footer.download')}
          </div>
        </CopyToClipboard>
        {/*<p className={styles.downloadTip}>{t('banner.downloadTip')}</p>*/}
      </div>

      <div className={styles.footerText}>
        <p className={styles.fText}>© {ClientConfig.name}, {t('banner.AllRightsReserved')}</p>
        <p className={styles.fText}>{ClientConfig.companyName}</p>
        <Link href={'/terms'} className={styles.otherBtn}>
          {t('banner.TermsOfUse')}
        </Link>
        <Link href={'/privacy'} className={styles.otherBtn}>
          {t('banner.PrivacyPolicy')}
        </Link>
      </div>
    </div>
  </div>
}

export default PcFooter
