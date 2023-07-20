import React, { FC, useEffect } from "react";
import { addListen, removeListen } from "@/utils/rem";
import { ownOs } from "@/utils/ownOs";
import PcHeader from "@/components/layout/pcHeader/PcHeader";
import PcFooter from "@/components/layout/pcFooter/PcFooter";
import useLogParams from "@/hooks/useLogParams";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDevice } from "@/store/modules/app.module";
import { EDevice } from "@/store/store.interfaces";
import MHeader from "@/components/layout/mHeader/MHeader";

interface IProps {
  children: React.ReactNode;
  pageProps: any
}

const DLayout: FC<IProps> = ({ children, pageProps }) => {
  const device = useAppSelector(state => state.app.device);
  const dispatch = useAppDispatch();

  // 页面曝光 打点参数初始化
  useLogParams(pageProps);

  useEffect(() => {
    setRemScript();
    addListen(setRemScriptListen);
    return () => {
      removeListen(setRemScriptListen)
    }
  },[]) // eslint-disable-line

  // 设置rem字体大小并判断设备 初始化
  const setRemScript = () => {
    const clientWidth = window.innerWidth || document.documentElement.clientWidth;
    const { isPc } = ownOs(window.navigator.userAgent);
    dispatch(setDevice(isPc ? EDevice.pc : EDevice.mobile));
    if (isPc) {
      /**pc端补偿google cls标准, 禁用以下*/ // todo
      // if (clientWidth <= 1366){
      //   document.documentElement.style.fontSize = 100 * (1366 / 1800) + 'px';
      // } else {
      //   document.documentElement.style.fontSize = 100 * (clientWidth / 1920) + 'px';
      // }
    } else {
      document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  }
  // 监听
  const setRemScriptListen = () => {
    const clientWidth = window.innerWidth || document.documentElement.clientWidth
    const { isPc } = ownOs(window.navigator.userAgent)
    if (isPc) {
      if (clientWidth >= 1366 && clientWidth <= 1800) {
        document.documentElement.style.fontSize = 100 * (clientWidth / 1700) + 'px';
      }
    } else {
      document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  }

  if (device === EDevice.pc) {
    return <>
      <PcHeader />
      <main style={{ width: '14.4rem', margin: '0 auto', minHeight: 'calc(100vh - 2.6rem)' }}>
        {children}
      </main>
      <PcFooter />
    </>
  }

  return (
    <>
      <MHeader/>
      <main style={{ backgroundColor: '#000000', minHeight: 'calc(100vh - 0.88rem)' }}>
        {children}
      </main>
    </>
  );
}

export default DLayout
