import React from "react";
import styles from "@/components/layout/mHeader/mLanguage/MLanguage.module.scss";
import { Popover } from "antd-mobile";
import { LanguageActions } from "@/typings/home.interface";
import { Action } from "antd-mobile/2x/es/components/popover";
import { useRouter } from "next/router";
import Image from "next/image";

const MLanguage = () => {
  const router = useRouter();

  // 切换语言
  const changeLanguage = (item: Action) => {
    if (router.pathname.includes('/browse/[typeTwoId]/[typeTwoName]')) {
      router.replace('/browse/0/all', undefined, { locale: item.key as string })
    } else {
      router.replace(router.asPath, router.asPath, { locale: item.key as string })
    }
  }

  return <div className={styles.language}>
    <Popover.Menu
      mode={'light'}
      actions={LanguageActions}
      getContainer={null}
      onAction={(item) => changeLanguage(item)}
      trigger='click'
      placement='bottom'
      defaultVisible={false}
      style={{
        'background': '#292929',
      }}
    >
      <div className={styles.rightBox}>
        <Image
          className={styles.languageIcon}
          width={32}
          height={32}
          src={'/images/home/language.png'}
          alt={'language'}
        />
        <span>{router.locale}</span>
      </div>
    </Popover.Menu>
  </div>
}

export default MLanguage;
