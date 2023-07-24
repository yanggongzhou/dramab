import { GetServerSideProps } from 'next'
import { netAllBook, netIncrementBook } from "@/server/home";
import { ESearchType, INetAllBookRes } from "@/typings/sitemap.interface";
import { getServerSideSitemapIndex, getServerSideSitemapIndexLegacy } from "next-sitemap";

/*
* 1. 站内页                   domain + /inside/sitemap.xml
* 2. 栏目页                   domain + /sitemaps/columns/sitemap.xml
* 3. 书籍详情页                domain + /sitemaps/books/sitemap.xml
* 4. 关键词 + 聚合页           domain + /sitemaps/keyword_tag/sitemap.xml
* 5. 增量                     domain + /sitemaps/new_source/sitemap.xml
* 6. 书籍id类 章节 + 章节列表   domain + /sitemaps/book_id_[bookId]/sitemap.xml
* 7. 类目页                   domain + /sitemaps/browse/sitemap.xml
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let allBookList: INetAllBookRes[] = [];
  let incrementBookList: string[] = [];
  let incrementBookTotalPage = 0;
  let keywordsTotal = 0;
  let incrementKeywordsTotal = 0;
  try {
    const response = await netAllBook({ searchType: ESearchType.ALL })
    if (response !== 'BadRequest_500' && response !== 'BadRequest_404') {
      allBookList = response;
    }
    const incrementBookResponse = await netIncrementBook(1, 100);
    if (incrementBookResponse !== 'BadRequest_500' && incrementBookResponse !== 'BadRequest_404') {
      incrementBookList = incrementBookResponse.data || [];
      incrementBookTotalPage = Number(incrementBookResponse.totalPage) || 0;
    }
  } catch (e) {
    console.error(`Sitemap Index api has error request - ${e}`)
  }
  const incrementBookMap = incrementBookList.length > 0 ?
    Array.from({ length: incrementBookTotalPage },
      (v, i) => `${process.env.WebDomain}/sitemaps/incremental_chapter_${i + 1}/sitemap.xml`)
    : [];
  const bookMap = allBookList.map(book => {
    return `${process.env.WebDomain}/sitemaps/book_id_${book.bookId}/sitemap.xml`
  });
  const tagMap = Array.from({ length: Math.ceil(keywordsTotal/10000) }, (v, i) => {
    return `${process.env.WebDomain}/sitemaps/tag_page_${i + 1}/sitemap.xml`
  });

  const tagIncrementalMap = Array.from({ length: Math.ceil(incrementKeywordsTotal/10000) }, (v, i) => {
    return `${process.env.WebDomain}/sitemaps/incremental_tag_page_${i + 1}/sitemap.xml`
  });
  const sitemaps: string[] = [
    `${process.env.WebDomain}/sitemaps/inside/sitemap.xml`,
    // `${process.env.WebDomain}/sitemaps/columns/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/books/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/keywords/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/browse/sitemap.xml`,
    ...bookMap,
    ...tagMap,
    ...tagIncrementalMap,
    `${process.env.WebDomain}/sitemaps/incremental/sitemap.xml`, // 新增地图 daily
    ...incrementBookMap
  ]
  return getServerSideSitemapIndexLegacy(ctx, sitemaps)
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
