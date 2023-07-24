import React, { FC } from "react";
import styles from '@/components/download/index.module.scss'
import { useTranslation } from "next-i18next";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  isApple: boolean;
}

const MDownload: FC<IProps> = ({ isApple }) => {

  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink =  useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });

  // const HiveLog = useHiveLog();
  const { t } = useTranslation('aboutUs');

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHead}>
      DramaBox <br/> {t('aboutTitle')}
    </div>
    <Image
      className={styles.downloadCover}
      width={440}
      height={440}
      src={'/images/download/cover.png'}
      placeholder="blur"
      blurDataURL={'/images/download/cover.png'}
      alt={ClientConfig.name}
    />
    <Link href={shopLink}>
      <CopyToClipboard text={copyText} onCopy={() => {
        // HiveLog.trackDownload('turnPage_click', { book_ID: bookId, chapter_id: chapterId })
      }}>
        <div className={styles.downloadBtn}>
          <Image
            className={styles.downloadBtnIcon}
            width={48}
            height={48}
            src={isApple ? '/images/download/ios.png' : '/images/download/android.png'}
            alt={ClientConfig.name}
          />
          <span>Download DramaBox</span>
        </div>
      </CopyToClipboard>
    </Link>
    <div className={styles.downloadContent}>
      <p>{t('aboutContent1')}</p>
      <p>{t('aboutContent2')}</p>
      <p>{t('aboutContent3')}</p>
      <p>{t('aboutContent4')}</p>
      <p>{t('aboutContent5')}</p>
      <p>{t('aboutContent6')}</p>
    </div>
  </div>
}

export default MDownload;
