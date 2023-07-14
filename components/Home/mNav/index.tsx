import React, { FC } from 'react'
import styles from './index.module.scss'
import Link from "next/link";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";

interface IProps {
  visible: boolean;
  cancel: () => void;
}

const MNav: FC<IProps> = ({ visible, cancel }) => {
  const { t } = useTranslation();
  const MenuData = [
    { id: 'about', label: t('nav.aboutUs'), link: '/about_us' },
    { id: 'business', label: t('nav.business'), link: '/business' },
    { id: 'user', label: t('banner.TermsOfUse'), link: '/terms' },
    { id: 'privacy', label: t('banner.PrivacyPolicy'), link: '/privacy' },
  ]
  return <div className={styles.navBox} style={{ display: visible ? 'block' : 'none' }} >
    <div className={styles.navMark} onClick={() => cancel()}/>
    <div className={styles.navMenu}>
      <div className={styles.navMenuContent}>
        { MenuData.map(val => {
          return <Link key={val.id} href={val.link} className={styles.navItem}>
              {val.label}
              <ImageCommon className={styles.navItemIcon} source={'/images/home/menu-item.png'} />
          </Link>
        }) }
      </div>
    </div>
  </div>
}

export default MNav
