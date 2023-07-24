import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styles from 'styles/Privacy.module.scss'
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "typings/home.interface";
import { useTranslation } from "next-i18next"
import Head from "next/head";

interface IProps {
  isPc: boolean;
}

/** 小说阅读吧 */
const AgreementPrivacy: NextPage<IProps> = ({ isPc }) => {
  const { t } = useTranslation('privacy')
  return <>
    <Head>
      <meta key="description" name="description" content={(t('privacyContent') || '').slice(0, 500)}/>
    </Head>
    { isPc ? <div className={styles.privacyWrap}>
      <div className={styles.privacyBox}>
        <div className={styles.privacyTitle}>{t('privacyTitle')}</div>
        <div className={styles.privacyContent}>
          { t('privacyContent') }
          {/*<a href="mailto:booksourceofficial@gmail.com" style={{color:"rgba(255, 126, 66, 1)"}}></a>*/}
        </div>
      </div>
    </div> :
      <div className={styles.mPrivacyWrap}>
        <div className={styles.mPrivacyTitle}>{t('privacyTitle')}</div>
        <div className={styles.mPrivacyIntro}>
          { t('privacyContent') }
        </div>
      </div>
    }
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      isPc: ownOs(ua).isPc,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common','privacy'])),
    }
  }
}

export default AgreementPrivacy;
