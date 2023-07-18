import React, { FC } from 'react'
import styles from '@/components/layout/pcHeader/PcHeader.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import { useRouter } from "next/router";
import Link from "next/link";
import ClientConfig from "@/client.config";
import { useTranslation } from "next-i18next";
import Language from "@/components/layout/pcHeader/Language";

interface IProps {

}

const PcHeader: FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation()
  const MenuData = [
    { id: 'index', label: t('nav.home'), link: '/' },
    { id: 'Featured', label: "Featured", link: '/browse/0/all' },
    { id: 'App', label: "App", link: '/download' },
  ]

  return <>
    <div className={styles.navWrap}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <Link href={'/'} className={styles.logoTxtBox}>
            <ImageCommon source={'/images/logo.png'} className={styles.logoTxt} alt={ClientConfig.name}/>
            <span>DramaBox</span>
          </Link>
          <div className={styles.navBox}>
            { MenuData.map(val => {
              return <Link key={val.id} href={val.link} className={(router.asPath === val.link || router.asPath.includes(val.id)) ? styles.navItemActive : styles.navItem}>
                <div className={styles.navItemLabel}>{val.label}</div>
              </Link>
            }) }
          </div>
        </div>
        { (router.pathname.includes('/tag/[keywordId]') || router.pathname.includes('/keywords')) ? null :  <Language/>}
      </div>
    </div>
    <div className={styles.navOccupy}/>
  </>
}

export default PcHeader
