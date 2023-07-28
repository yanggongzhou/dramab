import { ELanguage, IBookItem } from "@/typings/home.interface";

const commonTDK = {
  book: ({ bookInfo = {} as IBookItem }: { bookInfo: IBookItem}) => {
    const { bookName = '', introduction = '' } = bookInfo
    return {
      title: `${bookName}-DramaBox`,
      keywords: `${bookName}, ${bookName} Novel`,
      description: `${bookName} ${introduction.slice(0, 500)}`
    }
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
      title: 'DramaBox｜movies and drama',
      keywords: 'DramaBox,DramaBox Web Dramas,DramaBox app,DramaBox login',
      description: 'DramaBox can make all your wishes come true!Read over thousands of interesting Dramas, which can touch your heart and soul. You can also have fun at the same time! You can read it anytime and anywhere you want.The great novel app for readers! Fully guaranteed that you will love it and have a good mood too!Download DramaBox RIGHT NOW for endless fantasy!DramaBox,DramaBoxs books,DramaBox app,DramaBox login'
    },
    browse: ({ typeTwoName = '', page = '1' }) => {
      if (page === '1') {
        return {
          title: `${typeTwoName} Dramas stories series-DramaBox`,
          keywords: `${typeTwoName} Dramas stories series,DramaBox`,
          description: `DramaBox has found related content about ${typeTwoName} Dramas stories series  for you.This includes books related to ${typeTwoName} Dramas stories series,as well as ${typeTwoName} Dramas stories series related content information.`
        }
      }
      return {
        title: `${typeTwoName} Dramas stories series page ${page}-DramaBox`,
        keywords: `${typeTwoName} Dramas stories series page ${page},DramaBox`,
        description: `${typeTwoName}Dramas stories series page ${page}`
      }
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
    download: {
      title: 'DramaBox app download-DramaBox',
      keywords: 'DramaBox app,DramaBox',
      description: 'DramaBox app download'
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
  },
  [ELanguage.Korean]: {
    ...commonTDK,
    index: {
      title: 'DramaBox｜독서를 환상적으로 만드십시오',
      keywords: 'DramaBox, 책,DramaBox 앱,DramaBox 로그인',
      description: '소설 애호가를 위한 무료 온라인 웹사이트 소설책. 방대한 양의 영어 원문 스토리가 있는 인기 웹소설의 종류는 어반, 로맨스, 판타지, 늑대인간, 클래식 등이 있습니다. 보다 질 높은 콘텐츠와 경험을 위해 웹픽 공식 앱을 다운받아 함께 읽는 재미를 느껴보세요. 지금 다운로드하여 함께 읽으세요.DramaBox,DramaBoxs 책,DramaBox 앱,DramaBox 로그인'
    },
    browse: ({ typeTwoName = '', page = '1' }) => {
      if (page === '1') {
        return {
          title: `${typeTwoName}소설 이야기 시리즈-DramaBox`,
          keywords: `${typeTwoName}소설 이야기 시리즈,DramaBox`,
          description: `웹픽에서 ${typeTwoName}소설이야기 시리즈 관련 콘텐츠를 찾았습니다. 여기에는 ${typeTwoName}소설이야기 시리즈 관련 도서 및 ${typeTwoName}소설이야기 시리즈 관련 콘텐츠 정보가 포함됩니다.`
        }
      }
      return {
        title: `${typeTwoName}소설 이야기 시리즈 ${page}페이지-DramaBox`,
        keywords: `${typeTwoName}소설 이야기 시리즈 ${page}페이지,DramaBox`,
        description: `${typeTwoName}소설 이야기 시리즈 ${page}페이지`
      }
    },
    more: ({ positionName = '', page = '1'}) => {
      if (page === '1') {
        return {
          title: `${positionName}-DramaBox`,
          keywords: `${positionName},DramaBox`,
          description: `웹픽은 ${positionName}에 관련된 콘텐츠를 찾았습니다.여기는 ${positionName}에 관련된 책 및 콘텐츠 정보가 포함됩니다.`
        }
      }
      return { title: `${positionName}-${page}-DramaBox`, keywords: `${positionName}-${page}-DramaBox`, description: positionName }
    },
    download: {
      title: 'DramaBox 앱 다운로드-DramaBox',
      keywords: 'DramaBox 앱 다운로드,DramaBox',
      description: 'DramaBox 앱 다운로드'
    },
    error404: {
      title: '404-DramaBox',
      keywords: '',
      description: '현재 책이 존재하지 않습니다'
    },
    agreementPrivacy: {
      title: '개인정보 정책-DramaBox',
      keywords: '개인정보 정책,DramaBox',
      description: ''
    },
    agreementUser: {
      title: '이용약관-DramaBox',
      keywords: '이용약관,DramaBox',
      description: ''
    }
  },
  [ELanguage.Zh]: {
    ...commonTDK,
    index: {
      title: 'DramaBox｜追剧，电视，精彩故事',
      keywords: 'DramaBox,DramaBox Web Dramas,DramaBox app,DramaBox login',
      description: 'DramaBox can make all your wishes come true!Read over thousands of interesting Dramas, which can touch your heart and soul. You can also have fun at the same time! You can read it anytime and anywhere you want.The great novel app for readers! Fully guaranteed that you will love it and have a good mood too!Download DramaBox RIGHT NOW for endless fantasy!DramaBox,DramaBoxs books,DramaBox app,DramaBox login'
    },
    browse: ({ typeTwoName = '', page = '1' }) => {
      if (page === '1') {
        return {
          title: `${typeTwoName} Dramas stories series-DramaBox`,
          keywords: `${typeTwoName} Dramas stories series,DramaBox`,
          description: `DramaBox has found related content about ${typeTwoName} Dramas stories series  for you.This includes books related to ${typeTwoName} Dramas stories series,as well as ${typeTwoName} Dramas stories series related content information.`
        }
      }
      return {
        title: `${typeTwoName} Dramas stories series page ${page}-DramaBox`,
        keywords: `${typeTwoName} Dramas stories series page ${page},DramaBox`,
        description: `${typeTwoName}Dramas stories series page ${page}`
      }
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
    download: {
      title: 'DramaBox app download-DramaBox',
      keywords: 'DramaBox app,DramaBox',
      description: 'DramaBox app download'
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
  },
  [ELanguage.ZhHans]: {
    ...commonTDK,
    index: {
      title: 'DramaBox｜追剧，电视，精彩故事',
      keywords: 'DramaBox,DramaBox Web Dramas,DramaBox app,DramaBox login',
      description: 'DramaBox can make all your wishes come true!Read over thousands of interesting Dramas, which can touch your heart and soul. You can also have fun at the same time! You can read it anytime and anywhere you want.The great novel app for readers! Fully guaranteed that you will love it and have a good mood too!Download DramaBox RIGHT NOW for endless fantasy!DramaBox,DramaBoxs books,DramaBox app,DramaBox login'
    },
    browse: ({ typeTwoName = '', page = '1' }) => {
      if (page === '1') {
        return {
          title: `${typeTwoName} Dramas stories series-DramaBox`,
          keywords: `${typeTwoName} Dramas stories series,DramaBox`,
          description: `DramaBox has found related content about ${typeTwoName} Dramas stories series  for you.This includes books related to ${typeTwoName} Dramas stories series,as well as ${typeTwoName} Dramas stories series related content information.`
        }
      }
      return {
        title: `${typeTwoName} Dramas stories series page ${page}-DramaBox`,
        keywords: `${typeTwoName} Dramas stories series page ${page},DramaBox`,
        description: `${typeTwoName}Dramas stories series page ${page}`
      }
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
    download: {
      title: 'DramaBox app download-DramaBox',
      keywords: 'DramaBox app,DramaBox',
      description: 'DramaBox app download'
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
  },
}
