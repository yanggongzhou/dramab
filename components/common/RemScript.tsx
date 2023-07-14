'use client'

import React, { useEffect } from "react";
import { ownOs } from "@/utils/ownOs";
import Script from "next/script"

export default function RemScript() {

  // // 设置REM
  // const addListen = (fn: () => void) => {
  //   if (!document.addEventListener) return
  //   const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  //   window.addEventListener(resizeEvt, fn, false)
  //   document.addEventListener('DOMContentLoaded', fn, false)
  // }
  //
  // const removeListen = (fn: () => void) => {
  //   if (!document.addEventListener) return
  //   const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  //   window.removeEventListener(resizeEvt, fn, false)
  //   document.removeEventListener('DOMContentLoaded', fn, false)
  // }
  //
  // useEffect(() => {
  //   setRemScript();
  //   addListen(setRemScriptListen);
  //   return () => {
  //     removeListen(setRemScriptListen)
  //   }
  // },[]) // eslint-disable-line
  // // 设置rem字体大小并判断设备 初始化
  // const setRemScript = () => {
  //   const clientWidth = window.innerWidth || document.documentElement.clientWidth
  //   const { isPc } = ownOs(window.navigator.userAgent)
  //   if (isPc) {
  //     /**pc端补偿google cls标准, 禁用以下*/
  //     if (clientWidth <= 1366){
  //       document.documentElement.style.fontSize = 100 * (1366 / 1800) + 'px';
  //     } else {
  //       document.documentElement.style.fontSize = 100 * (clientWidth / 1800) + 'px';
  //     }
  //   } else {
  //     document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
  //   }
  //
  // }
  // // 监听
  // const setRemScriptListen = () => {
  //   const clientWidth = window.innerWidth || document.documentElement.clientWidth
  //   const { isPc } = ownOs(window.navigator.userAgent)
  //   if (isPc) {
  //     if (clientWidth >= 1366 && clientWidth <= 1800) {
  //       document.documentElement.style.fontSize = 100 * (clientWidth / 1700) + 'px';
  //     }
  //   } else {
  //     document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
  //   }
  // }
  // return null;
  return  <>
    <Script id="rem" strategy={'beforeInteractive'}>
      {`(function (doc, win) {
      var resizeEvt = "orientationchange" in win ? "orientationchange" : "resize";
      var recalc = function () {
        doc.documentElement.style.fontSize = 100 * (doc.documentElement.clientWidth / 720) + 'px'
      };
      recalc();
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
      win.onbeforeunload = function () {
        win.removeEventListener(resizeEvt, recalc, false)
        doc.removeEventListener('DOMContentLoaded', recalc, false)
      }
    })(document, window);`}
    </Script>
  </>
}
