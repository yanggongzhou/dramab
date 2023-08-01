import { useEffect, useState } from "react";
import { LanguageDefaultBookId } from "@/client.config";
import { useRouter } from "next/router";
import { ELanguage } from "@/typings/home.interface";
import { clipboardAsync, setClipboard, setLanguage } from "@/store/modules/hive.module";
import { useAppDispatch, useAppSelector } from "@/store";
import useHiveLog from "@/hooks/useHiveLog";
import { netIpUa } from "@/server/clientLog";
import { debounce } from "throttle-debounce";

const pathData = {
  index: '/',
  more: '/more/[position]',
  browse: '/browse/[typeTwoId]/[typeTwoName]',
  book: '/book_info/[bookId]/[typeTwoName]/[bookName]',
  download: '/download',
  error404: '/404',
  error500: '/500',
  agreementPrivacy: '/privacy',
  agreementUser: '/terms',
}

const useLogParams = (pageProps: any): void => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false); // 参数是否准备好了
  const HiveLog = useHiveLog();
  const clipboard = useAppSelector(state => state.hive.clipboard);

  useEffect(() => {
    const { ip, h5fingerPrint, bid } = clipboard;
    if (ip && h5fingerPrint && bid) {
      setIsReady(true)
      netIpUa(clipboard);
      HiveLog.appLaunch();
    }
  }, [clipboard]); // eslint-disable-line

  useEffect(() => {
    initClipboard()
  }, []) // eslint-disable-line

  const initClipboard = debounce(300,() => {
    dispatch(clipboardAsync())
  }, { atBegin: true })

  useEffect(() => {
    dispatch(setLanguage((router.locale ?? ELanguage.English) as ELanguage))
    const { bid, cid } = getIds();
    dispatch(setClipboard({ bid, cid }));
    if (isReady) {
      pageViewLog();
    }
  }, [router, isReady]); // eslint-disable-line

  // 页面曝光PV 获取的bookId 和 chapterId集中处理， 因为redux｜state更新数据有延迟
  const pageViewLog = () => {
    if (router.pathname === pathData.index) {
      HiveLog.pageView('HomePage_view');
    } else if (router.pathname.includes(pathData.more)) {
      // pageView('BookList_view', { Column_name: EnumPosition[pageProps.position] });
    } else if (router.pathname.includes(pathData.browse)) {
      // 浏览页曝光
      HiveLog.pageView('Browse_view', { class: pageProps.typeTwoName });
    } else if (router.pathname === pathData.book) {
      // 书籍详情页
      HiveLog.pageView('BookDetails_view', {
        book_ID: pageProps?.bookInfo?.bookId,
        book_name: pageProps?.bookInfo?.bookName,
      });
    } else if (router.pathname === pathData.download) {
      // 下载页
      HiveLog.pageView('turnPage_view');
    }
  }

  const getIds = (): { bid: string; cid: string | number } => {
    let clipboardBookId, clipboardChapterId;
    const localeBookId = LanguageDefaultBookId?.[(router.locale ?? ELanguage.English) as ELanguage] || LanguageDefaultBookId[ELanguage.English]
    if (router.pathname === pathData.book) {
      clipboardBookId = pageProps?.bookInfo?.bookId;
    } else {
      clipboardBookId = localeBookId
      clipboardChapterId = 0;
    }
    return {
      cid: clipboardChapterId ?? 0,
      bid: clipboardBookId ?? localeBookId,
    }
  }
};

export default useLogParams;
