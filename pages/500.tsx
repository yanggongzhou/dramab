import React, { useEffect, useState } from 'react'
import styles from '@/styles/404.module.scss';
import ImageCommon from "@/components/common/ImageCommon";
import Link from "next/link";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ELanguage } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store";
import { EDevice } from "@/store/store.interfaces";

interface IProps {
}

const Custom500: NextPage<IProps> = () => {
  const device = useAppSelector(state => state.app.device)
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false);  // 兼容：默认展示M端, pc端显示会有闪M的页面
  useEffect(() => {
    setIsShow(true)
  }, []);

  return <>
    {device === EDevice.pc ? <div className={styles.pc404Wrap}>
      <Link href="/" className={styles.pcEmptyIntro}>
        <p>{t('others.error')}</p>
      </Link>
      <ImageCommon source={'/images/404/500.jpg'} className={styles.pcEmptyImg} alt={'500'}/>
    </div> : null}

    {device === EDevice.mobile && isShow ? <div className={styles.ddWrap}>
      <ImageCommon source={'/images/404/emptyBook.png'} className={styles.emptyImg}/>
      <Link href="/" className={styles.emptyIntro}>
        <p>{t('others.error')}</p>
      </Link>
      <Link href={'/'} className={styles.emptyBtn}>
        {t('others.goHome')}
      </Link>
    </div> : null}
  </>
}

export default Custom500;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common']))
    },
  };
}
