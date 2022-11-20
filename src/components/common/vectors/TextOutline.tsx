import React, { FC } from 'react';

const TextOutline: FC<{ className: string }> = ({ className = 'h-7 w-7' }) => {
  return (
    <svg className={className} viewBox="0 0 16 16" xmlSpace="preserve">
      <path d="M10 0H2v16h12V4l-4-4zM9 5h4v10H3V1h6v4zm1-1V1l3 3h-3z" />
      <path d="M4 7h8v1H4V7zM4 9h8v1H4V9zM4 11h8v1H4v-1z" />
    </svg>
  );
};

export default TextOutline;
