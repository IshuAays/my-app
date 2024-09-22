import React, { useState } from 'react';
import Latex from 'react-latex-next';


const CVLatexEditor = () => {
  const [latexCode, setLatexCode] = useState(`
    \\documentclass{article}
    \\begin{document}
    Hello, this is a test CV!
    \\end{document}
  `);

  return (
    <div className='z-200 '>
      <h2>Enter LaTeX Code</h2>
      <textarea className='text-black'
        value={latexCode}
        onChange={(e) => setLatexCode(e.target.value)}
        rows="10"
        cols="50"
      />
      <div>
        <h2>Rendered CV</h2>
        <Latex>{latexCode}</Latex>
      </div>
    </div>
  );
};

export default CVLatexEditor;
