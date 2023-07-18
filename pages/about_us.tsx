import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ownOs } from "@/utils/ownOs";
import PcAbout from "@/components/PcAbout";
import MAbout from "@/components/MAbout";
import { ELanguage } from "typings/home.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface IProps {
  isPc: boolean;
}

const AboutUs: NextPage<IProps> = ({ isPc }) => {

  return <>
    {isPc ? <PcAbout /> : <MAbout />}
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const ua = req?.headers['user-agent'] || '';

  // 返回的参数将会按照 key 值赋值到 Home 组件的同名入参中
  return {
    props: {
      isPc: ownOs(ua).isPc,
      ...(await serverSideTranslations(locale ?? ELanguage.English, ['common', 'aboutUs']))
    }
  }
}

export default AboutUs;
