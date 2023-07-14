import React, { FC, useEffect, useState } from 'react'
import styles from './PcHeader.module.scss'
import ImageCommon from "@/components/common/ImageCommon";
import PcNav from "@/components/layout/pcHeader/nav";
import { useRouter } from "next/router";
import Link from "next/link";
import ClientConfig from "@/client.config";
import { Popover, Toast } from "antd-mobile";
import { LanguageActions } from "@/typings/home.interface";
import { useTranslation } from "next-i18next";
import { Action } from "antd-mobile/2x/es/components/popover";

interface IProps {
}

const PcHeader: FC<IProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(router.query?.searchValue || '');
  const _index = LanguageActions.findIndex(val => val.key === router.locale);
  const [language, setLanguage] = useState(_index !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
  useEffect(() => {
    const ind = LanguageActions.findIndex(val => val.key === router.locale);
    setLanguage(ind !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
    const _searchValue = router.query?.searchValue || ''
    setSearchValue(_searchValue);
  }, [router.locale, router]) // eslint-disable-line
  const onSearch = () => {
    if (searchValue) {
      router.push({ pathname: '/search', query: { searchValue } })
    } else {
      Toast.show(t('search.tip'))
    }
  }
  // 切换语言
  const changeLanguage = (item: Action) => {
    setLanguage(item.text as string)
    if (router.pathname.includes('/browse/[typeTwoId]/[typeTwoName]')) {
      router.replace('/browse/0/all', undefined, { locale: item.key as string })
    } else {
      router.replace(router.asPath, router.asPath, { locale: item.key as string })
    }
  }
  const [visible, setVisible] = useState(false);
  return <div className={styles.navWrap}>
    <div className={styles.navContent}>
      <div className={styles.navLeft}>
        <Link href={'/'} className={styles.logoTxtBox}>
            <ImageCommon source={'/images/logo.png'} className={styles.logoTxt} alt={ClientConfig.name}/>
            <span>Drama Box</span>
        </Link>
        <PcNav />
      </div>
      { (router.pathname.includes('/tag/[keywordId]') || router.pathname.includes('/keywords')) ? null : <div className={styles.language}>

        <Popover.Menu
          visible={visible}
          mode={'light'}
          actions={LanguageActions}
          getContainer={null}
          onVisibleChange={(visible) => setVisible(visible)}
          onAction={(item) => changeLanguage(item)}
          trigger='click'
          placement='bottom'
          defaultVisible={false}
        >
          <div className={ styles.languageBox}>
            <span className={styles.navItemTxt}>{language}</span>
            <ImageCommon source={'/images/home/wf_arrow.png'} className={visible ? styles.navItemActiveIcon : styles.navItemIcon}/>
          </div>
        </Popover.Menu>

      </div> }
      <div className={styles.navRight}>
        <ImageCommon source={'/images/home/wf_search.png'} className={styles.navRightIcon} onClick={() => onSearch()}/>
        <input
          className={styles.navRightInput}
          type="search"
          value={searchValue}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              onSearch()
            }
          }}
          onInput={(e) => {
            // @ts-ignore
            setSearchValue(e.target.value)
          }}
          placeholder={t('nav.search')}
        />
      </div>
    </div>
  </div>
}

export default PcHeader
