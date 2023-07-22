import React, { FC, useState } from "react";
import styles from "@/components/layout/mHeader/MHeader.module.scss";
import MNav from "@/components/layout/mHeader/mNav";
import MLanguage from "@/components/layout/mHeader/mLanguage/MLanguage";
import ClientConfig from "@/client.config";
import Image from "next/image";

interface IProps {
}

const MHeader: FC<IProps> = () => {
  const [visible, setVisible] = useState(false);

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
    <MNav visible={visible} cancel={() => navIconClick()}/>
    <div className={styles.headerContent}>
      <Image
        onClick={() => navIconClick()}
        className={styles.navMenuIcon}
        width={48}
        height={48}
        src={'/images/home/m-menu.png'}
        placeholder="blur"
        blurDataURL={'/images/home/m-menu.png'}
        alt={'menu'}
      />
      <Image
        className={styles.logoBox}
        width={181}
        height={40}
        src={'/images/logo2.png'}
        placeholder="blur"
        blurDataURL={'/images/logo2.png'}
        alt={ClientConfig.name}
      />
      <MLanguage/>

    </div>
    <div className={styles.headerOccupy}/>
  </>)
}

export default MHeader;
