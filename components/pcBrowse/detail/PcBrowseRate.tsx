import React, { FC } from 'react'
import styles from "@/components/pcBrowse/detail/PcBrowseRate.module.scss";
import ImageCommon from "@/components/common/ImageCommon";

interface IProps {
  rate: number
}

const PcBrowseRate: FC<IProps> = ({ rate }) => {
  const fill = Math.floor(rate/2);
  const half = rate%2 !== 0;
  const empty = half ? 4 - fill : 5 - fill;
  return <div className={styles.rateBox}>
    { !!fill && Array.from({ length: fill }, (v ,i) => {
      return <ImageCommon key={i} source={'/images/book/fill_star.png'} className={styles.rateItem}/>
    }) }
    { half && <ImageCommon source={'/images/book/half_star.png'} className={styles.rateItem}/> }
    { !!empty && Array.from({ length: empty }, (v ,i) => {
      return <ImageCommon key={i} source={'/images/book/empty_star.png'} className={styles.rateItem}/>
    }) }
  </div>
}

export default PcBrowseRate;
