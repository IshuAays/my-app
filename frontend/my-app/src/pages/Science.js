import React from 'react';

export default function () {
  return (
    <div className="text-center min-h-screen mt-[100px]">
      <h3 className='text-3xl font-bold mb-10' >Data Science Program Videos</h3>

      <div className="video-container" style={{ margin: '20px 0' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/pzo13OPXZS4"
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
          src="https://www.youtube.com/embed/dcXqhMqhZUo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
