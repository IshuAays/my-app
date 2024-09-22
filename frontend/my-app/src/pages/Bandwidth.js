import React from 'react';

export default function Bandwidth() {
  return (
    <div>
      <div className='min-h-screen mt-[100px]'>
        <iframe
          title="Interviewer_dashboard"
          className='w-full h-[40vh] md:w-[1000px] md:h-[620px] p-4'
          src="https://app.powerbi.com/reportEmbed?reportId=19fdbff7-42c4-49da-8557-cea5f93e3fa0&autoAuth=true&ctid=f9233a40-fb1a-464d-b85a-959e3ab8e454"
          frameBorder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
}
