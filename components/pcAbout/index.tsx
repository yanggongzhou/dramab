import React, { FC } from "react";
import styles from '@/components/PcAbout/index.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from "qrcode.react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Toast } from "antd-mobile";
import { ELanguage } from "typings/home.interface";
import { useAppSelector } from "@/store";

interface IProps {
}

const PcAbout: FC<IProps> = () => {
  const { t } = useTranslation('aboutUs');
  const { t: tCommon } = useTranslation('common');
  const router = useRouter();

  const copyUrl = useAppSelector(state => {
    const bookId = state.hive.clipboard.bid;
    const locale = state.hive.language;
    if (locale === ELanguage.English) {
      return `${process.env.WebDomain}/download_apps?bookId=${bookId}&path=${process.env.WebDomain + router.asPath}`
    }
    return `${process.env.WebDomain}/${router.locale}/download_apps?bookId=${bookId}&path=${process.env.WebDomain + '/' + locale + router.asPath}`
  })

  return <div className={styles.aboutWrap}>
    <div className={styles.aboutHeader}>
      <ImageCommon source={'/images/about/aboutBg.png'} className={styles.aboutHeaderBg}/>
      <div className={styles.aboutHeaderInter}>
        <div className={styles.aboutHeaderInter2}>
          <h3 className={styles.title}>{t('aboutTitle')}</h3>
          <div className={styles.line}/>
          <p>{t('aboutContent1')}</p>
          <p>{t('aboutContent2')}</p>
          <p>{t('aboutContent3')}</p>
          <p>{t('aboutContent4')}</p>
          <p>{t('aboutContent5')}</p>
          <p>{t('aboutContent6')}</p>
        </div>
      </div>
    </div>
    <div className={styles.storeBox}>
      <p className={styles.storeTitle}>{tCommon('reading.Download')}</p>
      <QRCode value={copyUrl} className={styles.qrCode}/>
      <p className={styles.copyTxt}>{t('aboutTurnOn')}<br/> {t('aboutOrCopy')}</p>
      <CopyToClipboard text={copyUrl} onCopy={() => {
        Toast.show(tCommon('footer.copied'))
      }}>
        <p className={styles.clickToCopy}>{tCommon('reading.ClickCopy')}</p>
      </CopyToClipboard>
    </div>
  </div>
}

export default PcAbout;
