import React from 'react';

export default function Engineer() {
  return (
    <div className="text-center min-h-screen mt-[100px]">
      <h2 className='text-3xl font-bold mb-10'>Data Engineering Program Videos</h2>

      <div className="video-container" style={{ margin: '20px 0' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bWIZqtlcnnY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-container" style={{ margin: '20px 0' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/xS82xt6wvzw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-container" style={{ margin: '20px 0' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/JUws0cMnL78"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
