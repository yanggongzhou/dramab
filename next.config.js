/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require("path");
const apiConfig = {
  /**
   * 网站域名
   */
  webDomainObj: {
    test: 'https://webfic-ssr.hw.dzods.cn',
    staging: 'https://yfbwww2.webfic.com',
    prod: 'https://www.novelread.com'
  },
  /**
   * ip ipua服务api
   */
  remoteUrlObj: {
    test: 'https://wfapi.hw.dzuds.cn/webfic',
    staging: 'http://wfapi.hw.dzuds.cn/novelread',
    prod: 'https://api.novelread.com/novelread'
  },
  /**
   * 网站服务api
   */
  baseUrlObj: {
    // test: 'http://192.168.0.253:8080',
    test: 'http://192.168.1.70:8080',
    staging: 'https://yfbwww.webfic.com',
    prod: 'https://www.webfic.com'
  },
}
const { webDomainObj, remoteUrlObj, baseUrlObj } = apiConfig

/**
 * 环境,手动更换
 */
const environment = 'test'; // "test" | "staging" | "prod"
const buildId = 'dramabox-010000'; // 构建ID

// 网站域名
const WebDomain = webDomainObj[environment]
// ip ipua服务api
const RemoteUrl = remoteUrlObj[environment]
// 网站服务api
const BaseUrl = baseUrlObj[environment]

const nextConfig = {
  reactStrictMode: true,
  // Configuring the Build ID
  generateBuildId: async () => {
    return buildId;
  },
  transpilePackages: ['antd-mobile'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "common.module.scss";`
  },
  // 内置多语言
  i18n,
  // https://www.nextjs.cn/docs/upgrading
  swcMinify: true,
  images: { // 远程图片资源域名
    domains: [
      'reshot.hw.dzods.cn',
      "res.webfic.com"
    ],
  },
  // proxy 代理
  async rewrites() {
    return [
      { source: '/client/:path*', destination: `${BaseUrl}/:path*` },
      { source: '/ap001/:path*', destination: `${RemoteUrl}/ap001/:path*` },
    ]
  },
  // 环境配置
  env: {
    BaseUrl,
    WebDomain,
  },
  // 参考 https://nextjs.org/docs/messages/swc-disabled
  experimental: {
    forceSwcTransforms: true,
  },
}
module.exports = nextConfig;

