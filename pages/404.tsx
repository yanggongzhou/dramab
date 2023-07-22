import React, { useEffect, useState } from 'react'
import styles from '@/styles/404.module.scss';
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import { useAppSelector } from '@/store';
import { EDevice } from "@/store/store.interfaces";
import Image from "next/image";

interface IProps {
}

const Custom404: NextPage<IProps> = () => {
  const device = useAppSelector(state => state.app.device)
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false); // 兼容：默认展示M端, pc端显示会有闪M的页面
  useEffect(() => {
    setIsShow(true)
  }, []);
  return <>

    {device === EDevice.pc ? <div className={styles.pc404Wrap}>
      <Link href="/" className={styles.pcEmptyIntro}>
        <p>{t('others.error')}</p>
      </Link>
      <Image
        className={styles.pcEmptyImg}
        width={640}
        height={590}
        src={'/images/404/404.png'}
        placeholder="blur"
        blurDataURL={'/images/404/404.png'}
        alt={'404'}
      />
    </div> : null}

    {device === EDevice.mobile && isShow ? <div className={styles.ddWrap}>
      <Image
        className={styles.emptyImg}
        width={180}
        height={132}
        src={'/images/404/emptyBook.png'}
        placeholder="blur"
        blurDataURL={'/images/404/emptyBook.png'}
        alt={'404'}
      />

      <Link href="/" className={styles.emptyIntro}>
        <p>{t('others.error')}</p>
      </Link>
      <Link href={'/'} className={styles.emptyBtn}>
        {t('others.goHome')}
      </Link>
    </div> : null}
  </>
}

export default Custom404;

// `pages/404` can not have getInitialProps/getServerSideProps
export const getStaticProps: GetStaticProps = async ({ locale }) =>{
  return {
    props: {
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common']))
    },
  };
}
