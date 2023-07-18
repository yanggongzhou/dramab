import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from "react";
import { ownOs } from "@/utils/ownOs";
import { DocumentInitialProps } from "next/dist/shared/lib/utils";
import { NextPage } from "next";

interface IProp extends DocumentInitialProps {
  isMobile: boolean;
}

const MyDocument: NextPage<IProp> = ({ isMobile }) => {

  return (
    <Html lang='en' style={{ fontSize: isMobile ? '52px' : '90px' }}>
      <Head />
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const logData = {
    path: ctx.req?.url,
    ua: ctx.req?.headers['user-agent'] || '',
    locale: ctx.locale,
    desc: "初次页面渲染"
  };
  console.info(JSON.stringify(logData));
  const initialProps = await Document.getInitialProps(ctx)
  const ua = ctx.req?.headers['user-agent'] || ''
  const isMobile = ownOs(ua).isMobile;
  return { ...initialProps, isMobile }
}

export default MyDocument
