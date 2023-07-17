import React, { FC } from 'react'
import Image from 'next/image'
import defaultBookBg from 'public/images/defaultBook.png'

interface IProps {
  className?: string | undefined;
  source: string;
  onClick?: () => void;
  alt?: string;
  w?: number;
  h?: number;
}

export const imgError = (e) => {
  e.target.style.visibility = 'hidden';
  e.target.src = defaultBookBg;
  e.target.onload = function (){
    e.target.style.visibility = 'visible';
  }
}

const ImageCommon: FC<IProps> = (
  { className , source, onClick, alt = '', w, h}
) => {

  return <div style={{ position: 'relative' }} className={className} onClick={() => onClick && onClick()}>
    <Image
      // onError={(e)=> imgError(e)}
      unoptimized
      layout={'fill'}
      // objectFit="cover"
      quality={100}
      // placeholder={'blur'}
      // blurDataURL={source}
        src={source}
      // loading={'eager'}
      alt={alt} />
  </div>
}

export default ImageCommon;
