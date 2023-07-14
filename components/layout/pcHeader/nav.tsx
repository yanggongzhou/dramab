import React, { FC } from 'react'
import styles from './PcHeader.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface IProps {}

const PcNav: FC<IProps> = () => {
  const { t } = useTranslation()
  const MenuData = [
    { id: 'index', label: t('nav.home'), link: '/' },
    { id: 'rankings', label: t('nav.bookRanking'), link: '/rankings' },
    { id: 'browse', label: t('nav.browse'), link: '/browse/0/all' },
    { id: 'about', label: t('nav.aboutUs'), link: '/about_us' },
    { id: 'business', label: t('nav.business'), link: '/business' },
  ]
  const router = useRouter()
  return <div className={styles.navBox}>
    { MenuData.map(val => {
      return <Link key={val.id} href={val.link} className={(router.asPath === val.link || router.asPath.includes(val.id)) ? styles.navItemActive : styles.navItem}>
          {val.label}
          {(router.asPath === val.link || router.asPath.match(val.id)) && <div className={styles.line}/>}
      </Link>
    }) }
  </div>
}

export default PcNav
