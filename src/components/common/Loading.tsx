import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-zinc-100 w-screen h-screen text-primary flex justify-center items-center z-50">
      <svg
      className=' animate-pulse fill-primary h-32 w-32'
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 1204.26 1080"
      version="1.1"
      viewBox="0 0 1204.26 1080"
      xmlSpace="preserve"
    >
      <path
        d="M269.87 1027.51L114.08 894.82 607.24 52.49 1086.35 894.82 921.76 1027.51 498 238.97 569.82 539.96z"
        className="st0"
      ></path>
      <path
        d="M351.52 894.82L859.68 894.82 921.76 1027.51z"
        className="st0"
      ></path>
      <path
        d="M607.24 554.36L425.58 854.3 773.72 854.3z"
        className="st0"
      ></path>
      <path
        d="M498 238.97L600.26 492.19 269.87 1027.51 114.08 894.82z"
        className="st0"
      ></path>
    </svg>
    </div>
  );
};

export default Loading;
