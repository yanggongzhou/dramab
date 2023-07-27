import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndex, getServerSideSitemapIndexLegacy } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sitemaps: string[] = [
    `${process.env.WebDomain}/sitemaps/inside/sitemap.xml`,
    // `${process.env.WebDomain}/sitemaps/columns/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/books/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/browse/sitemap.xml`,
    `${process.env.WebDomain}/sitemaps/incremental/sitemap.xml`, // 新增地图 daily
  ]
  return getServerSideSitemapIndexLegacy(ctx, sitemaps)
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
