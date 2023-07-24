import React, { FC } from 'react'
import Image from 'next/image'
import styles from "@/components/common/image/index.module.scss";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { UrlObject } from "url";

type Url = string | UrlObject;

interface IProps extends ImageProps {
  href: Url;
  replace?: boolean;
  scroll?: boolean;
  onClick?: () => void;
  scale?: boolean; // hover效果
}

export const onImgError = (e: any) => {
  console.log('imgError:')
  e.target.style.visibility = 'hidden';
  e.target.src = '/images/defaultBook.png';
  e.target.srcset = '/images/defaultBook.png';
  e.target.onload = function (){
    e.target.style.visibility = 'visible';
  }
}

const ImageCover: FC<IProps> = (props) => {

  const imageProps = { ...props };
  if (Reflect.has(imageProps, 'onClick')) {
    Reflect.deleteProperty(imageProps, 'onClick')
  }
  if (Reflect.has(imageProps, 'className')) {
    Reflect.deleteProperty(imageProps, 'className')
  }
  const { scale = false, href, className = '', onClick } = props;

  return <Link href={href} className={`${scale ? styles.imageScaleBox : styles.imageBox} ${className}`}
               onClick={() => onClick && onClick()}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image
      className={styles.imageItem}
      onError={onImgError}
      placeholder="blur"
      blurDataURL={imageProps.src as string || '/images/defaultBook.png'}
      {...imageProps}
    />
  </Link>
}

export default ImageCover;
