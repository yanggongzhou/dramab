import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "@/typings/home.interface";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Terms.module.scss";

interface IProps {
  isPc: boolean;
}
/** 小说阅读吧 */
const AgreementUser: NextPage<IProps> = ({ isPc }) => {
  const { t } = useTranslation()
  return <>
    <Head>
      <meta key="description" name="description" content={(t('terms.termsContent') || '').slice(0, 500)}/>
    </Head>
    { isPc ?
      <div className={styles.termsWrap}>
        <div className={styles.termsBox}>
          <div className={styles.termsTitle}>{t('terms.termsTitle')}</div>
          <div className={styles.termsContent}>
            {t('terms.termsContent')}
          </div>
        </div>
      </div>
      :
      <div className={styles.mTermsWrap}>
        <div className={styles.mTermsTitle}>{t('terms.termsTitle')}</div>
        <div className={styles.mTermsInfo}>
          {t('terms.termsContent')}
        </div>
      </div>}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
  const ua = req?.headers['user-agent'] || ''
  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      isPc: ownOs(ua).isPc,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}

export default AgreementUser;
