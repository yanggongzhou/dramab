import React, { FC } from 'react'
import styles from '@/components/layout/pcHeader/PcHeader.module.scss'
import { useRouter } from "next/router";
import Image from "next/image";
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
    { id: 'Featured', label: t('nav.featured'), link: '/browse/0/all' },
    { id: 'App', label: t('nav.app'), link: '/download' },
  ]

  return <>
    <div className={styles.navWrap}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <Link href={'/'} className={styles.logoTxtBox}>
            <Image
              className={styles.logoTxt}
              width={40}
              height={40}
              src={'/images/logo.png'}
              alt={ClientConfig.name}
            />
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
