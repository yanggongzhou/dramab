import { SitemapBuilder, withXMLResponse, withXMLResponseLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { ISitemapField } from "next-sitemap/dist/@types/interface";
import { netAllBook, netAllChapter, netAllColumn, netBrowseType, netIncrementBook, netKeywords } from "@/server/home";
import { ELanguage, EnumPosition, EPositionShowName } from "typings/home.interface";
import dayjs from "dayjs";
import { ESearchType } from "typings/sitemap.interface";

const sitemapBuilder = new SitemapBuilder()

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const lastmod = dayjs().day(1).format('YYYY-MM-DD');
  const options: ISitemapField = { loc: process.env.WebDomain as string, changefreq: 'weekly', priority: 0.7, lastmod };
  const { state = '' } = ctx.query as { state: string };
  const languageArr = Object.values(ELanguage);
  // 站内页
  if (state === 'inside') {
    const positionArr = Object.values(EPositionShowName);
    const insidePage = ['', '/about_us', '/business', '/privacy', '/terms', '/rankings']
    const insideFields: ISitemapField[] = insidePage.map(val => ({
      ...options,
      loc: options.loc + val,
      alternateRefs: languageArr.map(lan => {
        const _loc = lan === ELanguage.English ? val : `/${lan}${val}`
        return {href: options.loc + _loc,  hreflang: lan, hrefIsAbsolute: false }
      }),
      changefreq: 'monthly',
      lastmod: dayjs().date(1).format('YYYY-MM-DD'),
      trailingSlash: false
    }));
    const moreFields: ISitemapField[] = positionArr.map(pos => ({
      ...options,
      loc: `${options.loc}/more/${pos}`,
      alternateRefs: languageArr.map(lan => {
        const _loc = lan === ELanguage.English ? `/more/${pos}` : `/${lan}/more/${pos}`
        return {href: options.loc + _loc,  hreflang: lan, hrefIsAbsolute: false }
      }),
      changefreq: 'monthly',
      lastmod: dayjs().date(1).format('YYYY-MM-DD'),
      trailingSlash: false
    }));
    const fields = [...insideFields, ...moreFields] as ISitemapField[];
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  // 栏目
  if (state === 'columns') {
    const response = await netAllColumn();
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    let fields: ISitemapField[] = [];
    (response || []).forEach(val => {
      if(val.name !== EnumPosition.banner) {
        const pages = Array.from({ length: Math.ceil(val.bookCount / 10) }, (v, i) => {
          const _loc = val.name === EnumPosition.ranking ? `${options.loc}/rankings/${i+1}` : `${options.loc}/more/${EPositionShowName[val.name]}/${i+1}`
          return { ...options, loc: _loc }
        })
        fields = fields.concat(pages);
      }
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/ xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }

  // 浏览
  if (state === 'browse') {
    const response = await netBrowseType();
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    let fields: ISitemapField[] = [];
    (response || []).forEach(val => {
      const pages = Array.from({ length: Math.ceil(val.total / 60) }, (v, i) => {
        let _loc = `/browse/${val.id}/${val.replaceName}`;
        if (val.simpleLanguage !== ELanguage.English) {
          _loc = '/' + val.simpleLanguage + _loc
        }
        if (i > 0) {
          _loc += `/${i + 1}`
        }
        return { ...options, loc: options.loc + _loc }
      })
      fields = fields.concat(pages);
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/ xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }

  // 书籍详情
  if (state === 'books') {
    const response = await netAllBook({ searchType: ESearchType.ALL });
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    if (response === 'BadRequest_500' || bookResponse === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404' || bookResponse === 'BadRequest_404') return { notFound: true }
    const fields: ISitemapField[] = []
    response.forEach(book => {
      const isNewBook = bookResponse && bookResponse.length > 0 && bookResponse.findIndex(addBook => addBook.bookId === book.bookId) > 0;

      fields.push({
        ...options,
        lastmod: isNewBook ? book.utime : options.lastmod,
        changefreq: isNewBook ? 'daily' : options.changefreq,
        loc: `${options.loc}/book_info/${book.bookId}/${book.typeTwoName || 'all'}/${book.replacedBookName}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/book_info/${book.bookId}/${book.typeTwoName || 'all'}/${book.replacedBookName}`;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      })
    });
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');

    return withXMLResponseLegacy(ctx, content)
  }
  // 增量书籍数据
  if (state === 'incremental') {
    const bookResponse = await netAllBook({ searchType: ESearchType.INCREASE });
    if (bookResponse === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (bookResponse === 'BadRequest_404') return { notFound: true }
    const fields = (bookResponse || []).map(book => {
      return {
        ...options,
        changefreq: 'daily',
        lastmod: book.utime,
        loc: `${options.loc}/book_info/${book.bookId}/${book.typeTwoName || 'all'}/${book.replacedBookName}`,
        alternateRefs: (book.languages || []).map(lan => {
          let _loc = `/book_info/${book.bookId}/${book.typeTwoName || 'all'}/${book.replacedBookName}`;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      }
    }) as ISitemapField[]
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  // 追更书籍的章节 分页请求100
  if (state.includes('incremental_chapter_')) {
    const page = state.replace('incremental_chapter_', '') || 1;
    const response = await netIncrementBook(Number(page), 100);
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    const { data = [] } = response;
    // 所有追更书籍的章节请求
    const chaptersReqArr = data.map(bookId => netAllChapter({ bookId, searchType: ESearchType.INCREASE }))
    const res = await Promise.all(chaptersReqArr);
    const fields = [] as ISitemapField[];
    res.forEach((chaptersRes) => {
      if (chaptersRes !== 'BadRequest_500' && chaptersRes !== 'BadRequest_404' && chaptersRes.chapters && chaptersRes.chapters.length > 0){
        const { bookId, replacedBookName, chapters = [], languages = [] } = chaptersRes;
        chapters.forEach((val, ind) => {
          fields.push({
            ...options,
            changefreq: 'daily',
            lastmod: val.utime,
            loc: `${options.loc}/book/${replacedBookName}_${bookId}/Chapter-${ind + 1}_${val.id}`,
            alternateRefs: languages.map(lan => {
              let _loc = `/book/${replacedBookName}_${bookId}/Chapter-${ind + 1}_${val.id}`;
              if (lan !== ELanguage.English) {
                _loc = '/' + lan + _loc
              }
              return {
                href: options.loc + _loc,
                hreflang: lan,
                hrefIsAbsolute: false
              }
            }),
            trailingSlash: false
          })
        })
      }
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  // 关键词
  if (state === 'keywords') {
    const response = await netKeywords({ pageNum: 1, pageSize: 10, searchType: ESearchType.ALL })
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    const { data = [], total = 0 } = response;
    const fields = Array.from({ length: Math.ceil(total / 300) }, (v, i) => {
      return { ...options, loc: `${options.loc}/keywords/${i + 1}` }
    })
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 聚合页（新增）
  if (state.includes('incremental_tag_page_')) {
    const page = Number(state.replace('incremental_tag_page_', '')) || 0;
    const response = await netKeywords({ pageNum: page, pageSize: 10000, searchType: ESearchType.INCREASE });
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    const { data = [] } = response;
    const fields = data.map(value => {
      return { ...options, lastmod: value.utime, changefreq: 'daily', loc: `${options.loc}/tag/${value.id}` }
    }) as ISitemapField[];
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 聚合页 （总）
  if (state.includes('tag_page_')) {
    const page = Number(state.replace('tag_page_', '')) || 0;
    const response = await netKeywords({ pageNum: page, pageSize: 10000, searchType: ESearchType.ALL });
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    const { data = [] } = response;
    const fields = data.map(value => {
      return { ...options, loc: `${options.loc}/tag/${value.id}` }
    });
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, '');
    return withXMLResponseLegacy(ctx, content)
  }
  // 书籍id类
  if (state.includes('book_id_')) {
    const bookId = state.replace('book_id_', '');
    const response = await netAllChapter({ bookId, searchType: ESearchType.ALL });
    const newResponse = await netAllChapter({ bookId, searchType: ESearchType.INCREASE });
    if (response === 'BadRequest_500') return { redirect: { destination: '/500', permanent: false } }
    if (response === 'BadRequest_404') return { notFound: true }
    const newChapterData = (newResponse === 'BadRequest_404' || newResponse === 'BadRequest_500' || !newResponse.chapters) ? [] : newResponse.chapters;
    const { chapters = [], replacedBookName, languages = [] } = response;
    const catalogPages: ISitemapField[] = Array.from({ length: Math.ceil(chapters.length / 18) }, (v, i) => {
      return {
        ...options,
        loc: `${options.loc}/catalog/${bookId}/${i + 1}`,
        alternateRefs: languages.map(lan => {
          let _loc = `/catalog/${bookId}/${i + 1}`;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      }
    });

    const chapterPages: ISitemapField[] = chapters.map((val, index) => {
      const newIndex = newChapterData.findIndex(newc => newc.id === val.id);
      return {
        ...options,
        changefreq: newIndex > -1 ? 'daily' : 'weekly',
        lastmod: newIndex > -1 ? val.utime : lastmod,
        loc: `${options.loc}/book/${replacedBookName}_${bookId}/Chapter-${index + 1}_${val.id}`,
        alternateRefs: languages.map(lan => {
          let _loc = `/book/${replacedBookName}_${bookId}/Chapter-${index + 1}_${val.id}`;
          if (lan !== ELanguage.English) {
            _loc = '/' + lan + _loc
          }
          return {
            href: options.loc + _loc,
            hreflang: lan,
            hrefIsAbsolute: false
          }
        }),
        trailingSlash: false
      }
    })

    const fields: ISitemapField[] = [...catalogPages, ...chapterPages];
    const content = sitemapBuilder.buildSitemapXml(fields).replace(/xmlns:.*="(.*)"/g, 'xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    return withXMLResponseLegacy(ctx, content)
  }
  return { notFound: true }
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
