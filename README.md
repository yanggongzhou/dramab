## 【SEO系列】Drama Box
SSR

## 环境
```
// 测试环境jenkins

// 测试域名

// 预发布域名

// 线上域名
https://www.dramabox.com/
```

## 本地调试部署
```
1. yarn install
// 本地调试
2. yarn dev
// 打包 .next 和 生成sitemap地图
3. yarn build
// next服务 读取文件.next 和 public文件
4. yarn start
```

## 目录
```
项目
├─ .next // build生成文件
│
├─pages // 以动态路由页面为主，尽可能少处理客户端逻辑
│
├─public // 放置静态资源文件，字体、图片、语言啥的
│
├─components // 组件代码
├─context // 当前作用是全局layout
├─server // 服务api
├─store // 状态管理
├─hooks // 自定义hook
├─utils // 共用函数、参数
│
├─style // 页面级样式，不放拉到
│
├─typings // 声明文件、ts类型文件
│
├─next.config.js // next环境配置
│
├─api.config.js // 给next.config.js提供环境域名参数
│
├─next-i18next.config.js // 给next.config.js提供语言参数配置
│
└─package.json
```
