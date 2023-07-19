import { useEffect, useState } from "react";
import { LanguageDefaultBookId } from "@/client.config";
import { useRouter } from "next/router";
import { ELanguage, EnumPosition } from "typings/home.interface";
import { clipboardAsync, setClipboard, setLanguage } from "@/store/modules/hive.module";
import { useAppDispatch, useAppSelector } from "@/store";
import useHiveLog from "@/hooks/useHiveLog";
import { ownOs } from "@/utils/ownOs";
import { netIPUA } from "@/server/clientLog";

const pathData = {
  index: '/',
  search: '/search', // 有随机参数可能匹配, 最好放置头部，优先判断
  more: '/more/[position]',
  browse: '/browse/[typeTwoId]/[typeTwoName]',
  rankings: '/rankings',
  book: '/book_info/[bookId]/[typeTwoName]/[bookName]',
  chapter: '/book/[bookId]/[chapterId]',
  catalog: '/catalog/[bookId]',
  about: '/about_us',
  download: '/download_apps',
  business: '/business',
  error404: '/404',
  error500: '/500',
  agreementPrivacy: '/privacy',
  agreementUser: '/terms',
  tag: '/tag/[keywordId]',
  keywords: '/keywords'
}

const useLogParams = (pageProps: any): void => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false); // 参数是否准备好了
  const { appLaunch, pageView } = useHiveLog();
  const clipboard = useAppSelector(state => state.hive.clipboard);
  const copyText = useAppSelector(state => state.hive.copyText);

  useEffect(() => {
    const { ip, h5fingerPrint, bid } = clipboard;
    if (ip && h5fingerPrint && bid) {
      setIsReady(true)
    }
  }, [clipboard]); // eslint-disable-line

  useEffect(() => {
    if (isReady) {
      appLaunch();
      if (!ownOs(window.navigator.userAgent).isPc) {
        netIPUA(copyText, clipboard);
        // 移动端底部banner曝光
        pageView('Banner_view')
      }
    }
  }, [isReady]); // eslint-disable-line

  useEffect(() => {
    dispatch(clipboardAsync())
  }, []) // eslint-disable-line

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
      pageView('HomePage_view');
    } else if (router.pathname.includes(pathData.search)) {
      // 有查询随机参数，会影响判断
      return;
    } else if (router.pathname.includes(pathData.more)) {
      // pageView('BookList_view', { Column_name: EnumPosition[pageProps.position] });
    } else if (router.pathname.includes(pathData.browse)) {
      // 浏览页曝光
      pageView('Browse_view', { class: pageProps.typeTwoName });
    } else if (router.pathname.includes(pathData.rankings)) {
      pageView('BookList_view', { Column_name: EnumPosition.ranking });
    } else if (router.pathname === pathData.book) {
      // 书籍详情页
      pageView('BookDetails_view', {
        book_ID: pageProps?.bookInfo?.bookId,
        book_name: pageProps?.bookInfo?.bookName,
      });
    } else if (router.pathname === pathData.chapter) {
      // 章节详情页
      pageView('BookReader_view', {
        book_ID: pageProps?.bookInfo?.bookId,
        chapter_id: pageProps?.chapterInfo?.id,
        book_name: pageProps?.bookInfo?.bookName,
        chapter_name: pageProps?.chapterInfo?.chapterName,
        chapter_number: pageProps?.chapterInfo?.index + 1,
        Pay_or_not: pageProps?.chapterInfo?.unlock ? "no" : "yes",
      });
    } else if (router.pathname === pathData.download) {
      // 下载页
      pageView('turnPage_view');
    } else if (router.pathname.includes(pathData.tag)) {
      // 聚合页曝光
      pageView('Aggregate_page_exposure', { key_word: pageProps?.keyword });
    } else if (router.pathname.includes(pathData.keywords)) {
      // 关键词列表页曝光
      pageView('ListPage_view');
    }
  }

  const getIds = (): { bid: string; cid: string | 0 } => {
    let clipboardBookId, clipboardChapterId;
    const localeBookId = LanguageDefaultBookId?.[(router.locale ?? ELanguage.English) as ELanguage] || LanguageDefaultBookId[ELanguage.English]
    if (router.pathname === pathData.chapter){
      clipboardBookId = pageProps?.bookInfo?.bookId;
      clipboardChapterId = pageProps?.chapterInfo?.unlock ? pageProps?.chapterInfo?.id : pageProps?.chapterInfo?.lastChapterId
    } else if (router.pathname === pathData.download) {
      clipboardChapterId = pageProps?.chapterId;
      clipboardBookId = pageProps?.bookId;
    } else if (router.pathname === pathData.book) {
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
