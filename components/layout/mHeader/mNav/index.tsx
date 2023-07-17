import React, { FC } from 'react'
import styles from './index.module.scss'
import Link from "next/link";
import ImageCommon from "@/components/common/ImageCommon";
import { useTranslation } from "next-i18next";
import { Popup } from "antd-mobile";
import { useRouter } from "next/router";

interface IProps {
  visible: boolean;
  cancel: () => void;
}

const MNav: FC<IProps> = ({ visible, cancel }) => {
  const { t } = useTranslation();
  const MenuData = [
    { id: 'home', label: t('nav.home'), link: '/' },
    { id: 'feature', label: 'Feature', link: '/about_us' },
    { id: 'app', label: 'App', link: '/business' },
  ]
  const router = useRouter()

  return <Popup
    visible={visible}
    position={'left'}
    onMaskClick={() => {
      cancel()
    }}
    onClose={() => {
      cancel()
    }}
    bodyStyle={{
      backgroundColor: '#1C1C1E',
      padding: 0,
      width: '3.75rem'
    }}
  >
    <div className={styles.navHead}>
      <ImageCommon source={'/images/layout/m-menu-close.png'} className={styles.navClose} onClick={() => cancel()}/>
    </div>

    <div className={styles.navMenu}>
      {MenuData.map(val => {
        return <Link key={val.id} href={val.link}
                     className={router.pathname === val.link ? styles.navItemActive : styles.navItem}>
          <div className={styles.navItemTxt}>{val.label}</div>
        </Link>
      })}
    </div>
  </Popup>
}

export default MNav
