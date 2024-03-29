import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IPost } from '../../../../models/posts/post';
import Button from '../../../common/Button';

export interface ISiteFooterProps {
  contactWidgetData?: IPost;
  linksWidgetData?: IPost;
  newsletterWidgetData?: IPost;
}

const SiteFooter: FC<ISiteFooterProps> = ({
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
}) => {
  const router = useRouter();

  return (
    <div className="bg-zinc-100 w-full">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full py-20 px-4 space-y-14 md:space-y-0">
          {contactWidgetData?.content && (
            <div
              className="flex flex-col justify-center items-start w-full md:w-1/3 max-w-xs text-xs leading-5"
              dangerouslySetInnerHTML={{ __html: contactWidgetData?.content }}
            />
          )}
          <div className="flex flex-col justify-start h-full items-start w-full md:w-1/3 max-w-xs">
            <h5 className="text-dark font-bold text-base h-12 md:mb-4">
              Important Links
            </h5>
            {linksWidgetData?.content && (
              <div
                className="text-xs leading-5"
                dangerouslySetInnerHTML={{ __html: linksWidgetData.content }}
              />
            )}
          </div>
          <div className="flex flex-col justify-start h-full items-start w-full md:w-1/3 max-w-xs">
            <h5 className="text-dark font-bold text-base h-12 md:mb-4">
              Newsletter
            </h5>
            {newsletterWidgetData?.content && (
              <div
                className="text-zinc-500 text-xs mb-10 leading-5"
                dangerouslySetInnerHTML={{
                  __html: newsletterWidgetData.content,
                }}
              />
            )}
            <Button
              rounded="rounded-lg"
              size="h-7"
              type="button"
              variant="primary"
              onClick={() => {
                router.push('/newsletter/subscribe');
              }}
              extraCSSClasses="text-xs px-3"
            >
              Subscription
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-t-2 border-light px-4 py-3">
        <div className="flex justify-center items-center text-zinc-400 text-[10px] leading-loose">
          <span className="mr-1">Made with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-danger"
          >
            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
          </svg>
          <span className="ml-1">by Omid Rouhani</span>
        </div>
        <div className="flex justify-center items-center text-zinc-400 text-[10px] leading-loose">
          <span className="mr-1">Copyright</span>
          <span>ASPIANET</span>
          <span className="ml-1">{new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
