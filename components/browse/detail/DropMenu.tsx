import React, { FC, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownRef } from "antd-mobile";
import styles from "@/components/browse/detail/DropMenu.module.scss";
import Link from "next/link";
import { IBrowseTypes } from "@/typings/browse.interface";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IProps {
  types: IBrowseTypes[];
  typeTwoId: number;
  visible: boolean;
}

const DropMenu: FC<IProps> = ({ types, typeTwoId, visible }) => {
  const { t } = useTranslation()
  const dropdownRef = useRef<DropdownRef>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current?.close()
    }
  }, [visible]);

  useEffect(() => {
    if (activeRef.current && activeKey) {
      setTimeout(() => {
        activeRef.current?.scrollIntoView({ block: "start", behavior: "smooth", inline: "center" })
      }, 300)
    }
  }, [activeKey]);

  return (<Dropdown
    getContainer={() => document.getElementById('browse_box') as HTMLElement}
    ref={dropdownRef}
    arrow={null}
    onChange={(key) => {
      setActiveKey(key)
    }}
    className={styles.dropdownBox}
  >
    <Dropdown.Item
      forceRender
      key='sorter'
      title={
        <Image
          className={styles.menuTitleIcon}
          width={40}
          height={40}
          src={'/images/browse/more.png'}
          alt={'more'}
        />
      }>
      <div className={styles.menuBox}>

        <div className={styles.menuHead}>
          <span>Filter</span>
          <Image
            onClick={() => {
              dropdownRef.current?.close()
            }}
            className={styles.menuHeadIcon}
            width={40}
            height={40}
            src={'/images/browse/more.png'}
            alt={'close'}
          />
        </div>

        <div className={styles.menuContent}>
          {types.map((item) => {
            const typeName = item.id === 0 ? t('others.all') : item.name;
            if (typeTwoId === item.id) {
              return <div key={item.id} ref={activeRef} className={styles.menuActiveItem}
                          onClick={() => dropdownRef.current?.close()}>{typeName}</div>
            }
            return <Link key={item.id} href={`/browse/${item.id}/${item.replaceName || item.name}`}
                         className={styles.menuItem} onClick={() => dropdownRef.current?.close()}>
              {typeName}
            </Link>
          })}
        </div>
      </div>
    </Dropdown.Item>
  </Dropdown>)
}

export default DropMenu;
