import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    res.statusCode = 200
    res.write(`# *
User-agent: *
Allow: /

# Disallow
Disallow: /*?*
Disallow: /download?*

# Sitemaps
Sitemap: ${process.env.WebDomain}/sitemap/sitemapindex.xml`)
    res.end()
  } else {
    return {
      notFound: true
    }
  }
  return { props:{} }
}

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {}
