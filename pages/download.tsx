import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { isIos, ownOs } from "@/utils/ownOs";
import PcDownload from "@/components/pcDownload";
import MDownload from "@/components/download";
import { ELanguage } from "typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  isApple: boolean;
}

const DownloadApp: NextPage<IProps> = ({ isPc, isApple }) => {
  return <>
    {isPc ? <PcDownload isApple={isApple}/> : <MDownload isApple={isApple}/>}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const ua = req?.headers['user-agent'] || '';

  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      isPc: ownOs(ua).isPc,
      isApple: isIos(ua),
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common', 'aboutUs']))
    }
  }
}

export default DownloadApp;
