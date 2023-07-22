import React, { FC, useState } from "react";
import styles from "@/components/pcDownload/store/PcStore.module.scss";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toast } from "antd-mobile";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
import { ELanguage } from "@/typings/home.interface";
import Image from "next/image";

interface IProps {
  isApple: boolean;
}

const PcStore: FC<IProps> = ({ isApple }) => {
  const { t } = useTranslation('aboutUs');
  const { t: tCommon } = useTranslation('common');
  const [activeApple, setActiveApple] = useState(isApple);

  const router = useRouter();

  const copyUrl = useAppSelector(state => {
    const bookId = state.hive.clipboard.bid;
    const locale = state.hive.language;
    if (locale === ELanguage.English) {
      return `${process.env.WebDomain}/download?bookId=${bookId}&path=${process.env.WebDomain + router.asPath}`
    }
    return `${process.env.WebDomain}/${router.locale}/download?bookId=${bookId}&path=${process.env.WebDomain + '/' + locale + router.asPath}`
  })

  return <div className={styles.storeBox}>
    <h3 className={styles.storeTitle}>DramaBox App</h3>
    <p className={styles.storeSub}>Download to unlock even more exciting content</p>
    <div className={styles.storeContent}>
      <div className={styles.tabsTitle}>
        <div style={activeApple ? { backgroundColor: '#00000080' } : {}} className={styles.tabsTitleItem}
             onClick={() => setActiveApple(true)}>
          <Image
            className={styles.tabsTitleIcon}
            width={40}
            height={40}
            src={'/images/download/ios.png'}
            placeholder="blur"
            blurDataURL={'/images/download/ios.png'}
            alt={'ios'}
          />
          <div className={styles.tabsTitleRight}>
            <p>IOS</p>
            <span>Download</span>
          </div>
        </div>
        <div style={activeApple ? {} : { backgroundColor: '#00000080' }} className={styles.tabsTitleItem}
             onClick={() => setActiveApple(false)}>
          <Image
            className={styles.tabsTitleIcon}
            width={40}
            height={40}
            src={'/images/download/pc-android.png'}
            placeholder="blur"
            blurDataURL={'/images/download/pc-android.png'}
            alt={'android'}
          />
          <div className={styles.tabsTitleRight}>
            <p>Android</p>
            <span>Download</span>
          </div>
        </div>
      </div>

      <div className={styles.tabsContent}>
        <QRCode value={copyUrl} className={styles.qrCode}/>

        <p className={styles.copyTxt}>{t('aboutTurnOn')}<br/> {t('aboutOrCopy')}</p>
        <CopyToClipboard text={copyUrl} onCopy={() => {
          Toast.show(tCommon('footer.copied'))
        }}>
          <p className={styles.clickToCopy}>{tCommon('reading.ClickCopy')}</p>
        </CopyToClipboard>
      </div>

    </div>
  </div>
}

export default PcStore;
