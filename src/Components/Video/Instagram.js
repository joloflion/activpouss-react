import React from 'react';
import style from './Video.module.scss';

const InstagramEmbed = () => {
  return (
    <div className={style.instagramContainer}>
      <div className={style.instagramMedia}>
        <a href="https://www.instagram.com/reel/C2FtQD4L4Ds/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" rel="noopener noreferrer">
          <div className={style.instagramContent}>
            {/* Your Instagram content goes here */}
            ok
          </div>
        </a>
        <p className={style.instagramCaption}>
          <a href="https://www.instagram.com/reel/C2FtQD4L4Ds/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" rel="noopener noreferrer">Une publication partagée par Activ'pouss (@activpouss)</a>
        </p>
      </div>
    </div>
  );
}

export default InstagramEmbed;
