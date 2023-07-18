import React, { FC, useEffect, useState } from "react";
import { ActionSheet } from "antd-mobile";
import styles from "@/components/layout/mHeader/MHeader.module.scss";
import ImageCommon from "@/components/common/ImageCommon";
import { LanguageActions } from "@/typings/home.interface";
import MNav from "@/components/layout/mHeader/mNav";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Action } from "antd-mobile/es/components/action-sheet";
import MLanguage from "@/components/layout/mHeader/mLanguage/MLanguage";

interface IProps {
  actionChange?: () => void;
}

const MHeader: FC<IProps> = ({ actionChange }) => {
  const { t } = useTranslation();
  const router = useRouter()
  const [actionVisible, setActionVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (actionVisible) {
      setVisible(false);
    }
    if (visible || actionVisible) {
      actionChange && actionChange()
    }
  }, [actionVisible, visible]); // eslint-disable-line

  const navIconClick = () => {
    if (visible) {
      setVisible(false)
      document.body.style.overflow = ''
    } else {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }

  return (<>
    {/*<ActionSheet*/}
    {/*  extra={<div className={styles.actionSheetTitleBox}>*/}
    {/*    <div className={styles.actionSheetTitle}>{t('menu.languageSetting')}</div>*/}
    {/*    <ImageCommon className={styles.asClose} source={'/images/home/as-close.png'} onClick={() => setActionVisible(false)}/>*/}
    {/*  </div>}*/}
    {/*  visible={actionVisible}*/}
    {/*  actions={LanguageActions}*/}
    {/*  onClose={() => setActionVisible(false)}*/}
    {/*  onAction={action => changeLanguage(action)}*/}
    {/*/>*/}

    <MNav visible={visible} cancel={() => navIconClick()}/>

    {/*顶部搜索背景块*/}
    <div className={styles.headerContent}>
      <ImageCommon className={styles.navMenuIcon} source={'/images/home/m-menu.png'} onClick={() => navIconClick()} />

      <ImageCommon className={styles.logoBox} source={'/images/logo2.png'}/>

      <MLanguage/>

    </div>
    <div className={styles.headerOccupy} />

    {/*<div className={styles.homeTab}>*/}
    {/*  { router.pathname === '/' ? <>*/}
    {/*    <div className={styles.homeTabItemActive}>{t('nav.home')}</div>*/}
    {/*    <Link href={'/browse/0/all'} className={styles.homeTabItem}>*/}
    {/*      {t('nav.browse')}*/}
    {/*    </Link>*/}
    {/*  </> : <>*/}
    {/*    <Link href="/" className={styles.homeTabItem}>*/}
    {/*      {t('nav.home')}*/}
    {/*    </Link>*/}
    {/*    <div className={styles.homeTabItemActive}>{t('nav.browse')}</div>*/}
    {/*  </>}*/}
    {/*</div>*/}
  </>)
}

export default MHeader;
