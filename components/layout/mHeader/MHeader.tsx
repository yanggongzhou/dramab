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

  // 切换语言
  const changeLanguage = (action: Action) => {
    setActionVisible(false)
    if (router.pathname.includes('/browse/[typeTwoId]/[typeTwoName]')) {
      router.replace('/browse/0/all', undefined, { locale: action.key as string })
    } else {
      router.replace(router.asPath, router.asPath, { locale: action.key as string });
    }
  }

  return (<>
    <ActionSheet
      extra={<div className={styles.actionSheetTitleBox}>
        <div className={styles.actionSheetTitle}>{t('menu.languageSetting')}</div>
        <ImageCommon className={styles.asClose} source={'/images/home/as-close.png'} onClick={() => setActionVisible(false)}/>
      </div>}
      visible={actionVisible}
      actions={LanguageActions}
      onClose={() => setActionVisible(false)}
      onAction={action => changeLanguage(action)}
    />

    <MNav visible={visible} cancel={() => navIconClick()}/>

    {/*顶部搜索背景块*/}
    <div className={styles.headerContent}>
      <ImageCommon
        className={styles.navMenuIcon}
        source={visible ? '/images/home/m-menu-cancel.png' : '/images/home/m-menu.png'}
        onClick={() => navIconClick()} />
      <ImageCommon className={styles.logoBox} source={'/images/logo2.png'}/>
      <div className={styles.rightBox}>
        <ImageCommon className={styles.languageIcon} source={'/images/home/language.png'} onClick={() => setActionVisible(true)}/>
        <span onClick={() => setActionVisible(true)}>{router.locale}</span>
      </div>
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
