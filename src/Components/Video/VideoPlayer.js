import React from 'react'
import ReactPlayer from 'react-player';
import styles from "./Video.module.scss";

export const  VideoPlayer = ({post}) => {
  return (
    <div className={'mb-5 '+ styles.selectedVideo} >
      {<ReactPlayer 
      controls={true} 
      light={<img src={post?.coverImageUrl[0]} alt='Thumbnail' width='100%' height='100%' />}
      width='100%'
      height='380px'
      url={post?.videoUrl} />}
    </div>
  )
}
