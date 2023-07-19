import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import React, { useMemo } from "react";
import { netHomeData } from "@/server/home";
import { ELanguage, EnumPosition, IBannerItem, IPageColumnsItem } from "@/typings/home.interface";
import PcHome from "@/components/pcHome/PcHome";
import MHome from "@/components/home/MHome";
import { ownOs } from "@/utils/ownOs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsResult } from "next/types";
import { SSRConfig } from "next-i18next";

interface IProps extends SSRConfig {
  isPc: boolean;
  homeData: IPageColumnsItem[];
}

const Home: NextPage<IProps> = ({ isPc, homeData = [] }) => {
  const bannerList = useMemo<IBannerItem[]>(() => {
    return (homeData.find(item => item.name === EnumPosition.banner) || { items: [] }).items as IBannerItem[];
  }, [homeData]);

  return <>
    {isPc ? <PcHome homeData={homeData}/> : <MHome homeData={homeData} bannerList={bannerList}/>}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }): Promise<GetServerSidePropsResult<IProps>> => {
  const ua = req?.headers['user-agent'] || ''
  const homeData = await netHomeData(locale as ELanguage);

  if (homeData === 'BadRequest_404') {
    return { notFound: true }
  }
  if (homeData === 'BadRequest_500') {
    return { redirect: { destination: '/500', permanent: false } }
  }
  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      homeData,
      isPc: ownOs(ua).isPc,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common'])),
    }
  }
}

export default Home
