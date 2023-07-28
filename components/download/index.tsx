import React, { FC } from "react";
import styles from '@/components/download/index.module.scss'
import { useTranslation } from "next-i18next";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppSelector } from "@/store";
import ClientConfig from "@/client.config";
import Link from "next/link";
import Image from "next/image";
import { netIpUa } from "@/server/clientLog";

interface IProps {
  isApple: boolean;
}

const MDownload: FC<IProps> = ({ isApple }) => {
  const { t } = useTranslation();
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const copyText = useAppSelector(state => state.hive.copyText);
  const shopLink =  useAppSelector(state => {
    if (isApple) {
      return ClientConfig.ios.deeplink + state.hive.copyText;
    }
    return ClientConfig.android.link;
  });

  // const HiveLog = useHiveLog();

  return <div className={styles.downloadWrap}>
    <div className={styles.downloadHead}>
      {t('appPage.title')}
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
        netIpUa(clipboard)
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
          <span>{t("appPage.download")}</span>
        </div>
      </CopyToClipboard>
    </Link>
    <div className={styles.downloadContent}>
      {t("appPage.content")}
    </div>
  </div>
}

export default MDownload;
