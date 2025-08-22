import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] p-4 text-center text-sm text-gray-400 mt-8 rounded-t-3xl">
      <p>
        <br className="sm:hidden" /> Developed by{' '}
        <a 
          href="https://github.com/jeffersonbalde" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-[#00FF85] underline"
        >
          iloveamie | ONE GROUP
        </a>{' '}
        from Saint Columban College Pagadian for Survey Purposes.
      </p>
    </footer>
  );
}