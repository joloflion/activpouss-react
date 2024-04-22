import React from 'react'
import ReactPlayer from 'react-player';

export const  VideoPlayer = ({post}) => {
  console.log(post)
  return (
    <div className='mb-5'>
      <ReactPlayer 
      controls={true} 
      light={<img src={post?.image} alt='Thumbnail' width='100%' height='380px' />}
      width='100%'
      height='340px'
      url={post?.url} />
    </div>
  )
}
