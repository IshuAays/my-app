import React from 'react';

export default function Analyst() {
  return (
    <div className="text-center min-h-screen mt-[100px]">
      <h1 className='text-3xl font-bold mb-10' >Data Analyst Program Videos</h1>

      <div className="video-container" style={{ margin: '20px 0' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/VaSjiJMrq24"
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
          src="https://www.youtube.com/embed/dMn2QFTyXUQ"
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
          src="https://www.youtube.com/embed/r3WuDHyOlv4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
