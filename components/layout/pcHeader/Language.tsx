import React, { useEffect, useState } from "react";
import styles from "@/components/layout/pcHeader/PcHeader.module.scss";
import { Popover } from "antd-mobile";
import { LanguageActions } from "@/typings/home.interface";
import ImageCommon from "@/components/common/ImageCommon";
import { Action } from "antd-mobile/2x/es/components/popover";
import { useRouter } from "next/router";

const Language = () => {
  const router = useRouter();
  const _index = LanguageActions.findIndex(val => val.key === router.locale);
  const [language, setLanguage] = useState(_index !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
  useEffect(() => {
    const ind = LanguageActions.findIndex(val => val.key === router.locale);
    setLanguage(ind !== -1 ? LanguageActions[_index].text : LanguageActions[0].text);
  }, [router.locale, router]) // eslint-disable-line
  const [visible, setVisible] = useState(false);
  // 切换语言
  const changeLanguage = (item: Action) => {
    setLanguage(item.text as string)
    if (router.pathname.includes('/browse/[typeTwoId]/[typeTwoName]')) {
      router.replace('/browse/0/all', undefined, { locale: item.key as string })
    } else {
      router.replace(router.asPath, router.asPath, { locale: item.key as string })
    }
  }

  return <div className={styles.language}>
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
      <div className={visible ? styles.languageBoxActive : styles.languageBox}>
        <span className={styles.navItemTxt}>{language}</span>
        <ImageCommon source={visible ? '/images/layout/arrow-up.png' : '/images/layout/arrow-down.png'} className={styles.navItemIcon}/>
      </div>
    </Popover.Menu>
  </div>
}

export default Language;
