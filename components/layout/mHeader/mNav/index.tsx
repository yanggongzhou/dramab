import React, { FC } from 'react'
import styles from './index.module.scss'
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Popup } from "antd-mobile";
import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  visible: boolean;
  cancel: () => void;
}

const MNav: FC<IProps> = ({ visible, cancel }) => {
  const { t } = useTranslation();
  const MenuData = [
    { id: 'home', label: t('nav.home'), link: '/' },
    { id: 'feature', label: 'Feature', link: '/browse/0/all' },
    { id: 'app', label: 'App', link: '/download' },
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
      <Image
        onClick={() => cancel()}
        className={styles.navClose}
        width={48}
        height={48}
        src={'/images/layout/m-menu-close.png'}
        placeholder="blur"
        blurDataURL={'/images/layout/m-menu-close.png'}
        alt={'close'}
      />
    </div>

    <div className={styles.navMenu}>
      {MenuData.map(val => {
        return <Link
          key={val.id}
          href={val.link}
          className={router.pathname === val.link ? styles.navItemActive : styles.navItem}
          onClick={() => cancel()}
        >
          <div className={styles.navItemTxt}>{val.label}</div>
        </Link>
      })}
    </div>
  </Popup>
}

export default MNav
