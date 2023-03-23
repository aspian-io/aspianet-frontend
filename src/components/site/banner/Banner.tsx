import React, { FC, useState } from 'react';

interface IProps {
  content?: string;
}

const Banner: FC<IProps> = ({ content }) => {
  const [close, setClose] = useState(false);
  return (
    <>
      {content && !close && (
        <div className="bg-primary w-full py-4 border-t border-t-light">
          <div className="container mx-auto">
            <div className="flex w-full">
              <div
                className="text-light"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="ml-auto">
                <div
                  className="text-light/40 hoverable:hover:text-light mx-4 cursor-pointer h-6 transition-all duration-300"
                  onClick={() => setClose(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
