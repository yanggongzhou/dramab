import ClientConfig from "@/client.config";
import { ELanguage, IBookItem } from "@/typings/home.interface";
import { INetChapterRes } from "@/typings/chapter.interface";

const email = ClientConfig.email;

const commonTDK = {
  book: ({ bookInfo = {} as IBookItem }: { bookInfo: IBookItem}) => {
    const { bookName = '', introduction = '' } = bookInfo
    return {
      title: `${bookName}-DramaBox`,
      keywords: `${bookName}, ${bookName} Novel`,
      description: `${bookName} ${introduction.slice(0, 500)}`
    }
  },
  chapter: ({ bookInfo = {} as IBookItem, chapterInfo = {} as INetChapterRes, chapterContent = ''}) => {
    const { bookName = '' } = bookInfo;
    const { chapterIndex = 1, chapterName } = chapterInfo;
    return {
      title: `Chapter ${chapterIndex} ${bookName}-DramaBox`,
      keywords: `${bookName} Chapter ${chapterIndex},${bookName} Chapter ${chapterIndex} Novel, ${chapterName}`,
      description: `${bookName} Chapter ${chapterIndex} ${chapterName}, ${chapterContent.slice(0, 500)}` // 500字符
    }
  },
  tag: ({ keyword = '', page = '1' }) => {
    if (page === '1') {
      return {
        title: `${keyword}-DramaBox`,
        keywords: `${keyword}`,
        description: `DramaBox has found related content about ${keyword} for you.This includes books related to ${keyword},as well as ${keyword} related content information.`
      }
    }
    return {
      title: `${keyword}-${page}-DramaBox`,
      keywords: `${keyword} ${page}`,
      description: `DramaBox has found related content about ${keyword} for you.This includes books related to ${keyword},as well as ${keyword} related content information.`
    }
  },
  keywords: ({ page = '1' }) => {
    if (page === '1') {
      return { title: 'DramaBox Novel-DramaBox', keywords: 'DramaBox Novel,DramaBox', description: 'DramaBox Novel' }
    }
    return { title: `DramaBox Novel-${page}-DramaBox`, keywords: `DramaBox Novel ${page},DramaBox`, description: `DramaBox Novel ${page}` }
  },
  error500: {
    title: '500-DramaBox',
    keywords: '',
    description: '',
  },
}

export const TDK = {
  [ELanguage.English]: {
    ...commonTDK,
    index: {
      title: 'DramaBox｜Web Novels,Books Online to Read',
      keywords: 'DramaBox,DramaBox Web Novels,DramaBox app,DramaBox login',
      description: 'DramaBox can make all your wishes come true!Read over thousands of interesting novels, which can touch your heart and soul. You can also have fun at the same time! You can read it anytime and anywhere you want.The great novel app for readers! Fully guaranteed that you will love it and have a good mood too!Download DramaBox RIGHT NOW for endless fantasy!DramaBox,DramaBoxs books,DramaBox app,DramaBox login'
    },
    browse: ({ typeTwoName = '', page = '1' }) => {
      if (page === '1') {
        return {
          title: `${typeTwoName} novels stories series-DramaBox`,
          keywords: `${typeTwoName} novels stories series,DramaBox`,
          description: `DramaBox has found related content about ${typeTwoName} novels stories series  for you.This includes books related to ${typeTwoName} novels stories series,as well as ${typeTwoName} novels stories series related content information.`
        }
      }
      return {
        title: `${typeTwoName} novels stories series page ${page}-DramaBox`,
        keywords: `${typeTwoName} novels stories series page ${page},DramaBox`,
        description: `${typeTwoName}novels stories series page ${page}`
      }
    },
    search: ({ searchValue = '' }) => ({
      title: `${searchValue}-DramaBox`,
      keywords: searchValue,
      description: `DramaBox has found related content about ${searchValue} for you.This includes books related to ${searchValue},as well as ${searchValue} related content information.`
    }),
    rankings: {
      title: 'Book Ranking-DramaBox',
      keywords: 'Book Ranking,DramaBox',
      description: 'Popular Books Ranking Watch Online'
    },
    more: ({ positionName = '', page = '1'}) => {
      if (page === '1') {
        return {
          title: `${positionName}-DramaBox`,
          keywords: `${positionName},DramaBox`,
          description: `DramaBox has found related content about ${positionName} for you.This includes books related to ${positionName},as well as ${positionName} related content information.`
        }
      }
      return { title: `${positionName}-${page}-DramaBox`, keywords: `${positionName}-${page}-DramaBox`, description: positionName }
    },
    catalog: ({ bookInfo = {} as IBookItem, page = '1'}) => {
      if (page === '1') {
        return {
          title: `${bookInfo.bookName} catalog -DramaBox`,
          keywords: `${bookInfo.bookName} catalog,DramaBox`,
          description: `read the novel ${bookInfo.bookName} catalog online, online stories ${bookInfo.bookName} PDF`
        }
      }
      return {
        title: `${bookInfo.bookName} catalog ${page}-DramaBox`,
        keywords: `${bookInfo.bookName} catalog ${page},DramaBox`,
        description: `read the novel ${bookInfo.bookName} catalog ${page} online, online stories ${bookInfo.bookName} PDF`
      }
    },
    about: {
      title: 'About Us-DramaBox',
      keywords: 'About Us,DramaBox',
      description: 'Free online website novels & books for fiction loves.  Popular web novels with massive original English stories, types include urban, romance,  fantasy, werewolf, classic and so on.  For more high-quality content and experience, you can download the DramaBox official app  and enjoy the fun of reading together.  Download it now and enjoy reading together.'
    },
    download: {
      title: 'DramaBox app download-DramaBox',
      keywords: 'DramaBox app,DramaBox',
      description: 'DramaBox app download'
    },
    business: {
      title: 'Business-DramaBox',
      keywords: 'Business,DramaBox',
      description: `Thank you for your interest in DramaBox. We want to hear your voice.If you have other questions or concerns, please send us email to ${email}`
    },
    error404: {
      title: '404-DramaBox',
      keywords: '',
      description: 'The Current Book Does Not Exist',
    },
    agreementPrivacy: {
      title: 'Privacy Policy-DramaBox',
      keywords: 'Privacy Policy,DramaBox',
      description: ''
    },
    agreementUser: {
      title: 'Terms of Use-DramaBox',
      keywords: 'Terms of Use,DramaBox',
      description: ''
    }
  }
}
