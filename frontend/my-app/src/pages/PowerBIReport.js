// src/pages/PowerBIReport.js
import React from 'react';

const PowerBIReport = () => {
  return (
    <div className='min-h-screen'>
      <iframe className='p-20 scale-50 md:scale-100'  title="powerBi" width="1000" height="620" src="
https://app.powerbi.com/reportEmbed?reportId=60a2755b-5b9a-471e-98c7-099dbdf1c5db&autoAuth=true&ctid=f9233a40-fb1a-464d-b85a-959e3ab8e454"
frameborder="0" allowFullScreen="true"></iframe>
    </div>
  );
};

export default PowerBIReport;
