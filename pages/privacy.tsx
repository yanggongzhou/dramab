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

  const EnTable = () => {
    return (<table className={styles.tableItems}>
      <tbody>
        <tr>
          <th>{t('privacyTh1')}</th>
          <th>{t('privacyTh2')}</th>
        </tr>
        <tr>
          <td>{t('privacyTd1')}</td>
          <td>{t('privacyTd2')}</td>
        </tr>
        <tr>
          <td>{t('privacyTd3')}</td>
          <td>{t('privacyTd4')}</td>
        </tr>
        <tr>
          <td>{t('privacyTd5')}</td>
          <td>{t('privacyTd6')}</td>
        </tr>
        <tr>
          <td>{t('privacyTd7')}</td>
          <td>{t('privacyTd8')}</td>
        </tr>
      </tbody>
    </table>)
  }

  return <>
    <Head>
      <meta key="description" name="description" content={(t('privacyContent1') || '').slice(0, 500)}/>
    </Head>
    { isPc ? <div className={styles.privacyWrap}>
      <div className={styles.privacyBox}>
        <div className={styles.privacyTitle}>{t('privacyTitle')}</div>
        <div className={styles.privacyContent}>
          { t('privacyContent1') }
          { t('privacyTh1') ? <EnTable/> : null }
          { t('privacyContent2') }
          {/*<a href="mailto:booksourceofficial@gmail.com" style={{color:"rgba(255, 126, 66, 1)"}}></a>*/}
        </div>
      </div>
    </div> :
      <div className={styles.mPrivacyWrap}>
        <div className={styles.mPrivacyTitle}>{t('privacyTitle')}</div>
        <div className={styles.mPrivacyIntro}>
          { t('privacyContent1') }
          { t('privacyTh1') ? <EnTable/> : null }
          { t('privacyContent2') }
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
