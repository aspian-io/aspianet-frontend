import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { FC, Fragment, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchDebounce } from '../../../../hooks/site/useSearchDebounce';
import { PostAgent } from '../../../../lib/axios/agent';
import { PostTypeEnum } from '../../../../models/posts/admin/post';
import { IMiniPost } from '../../../../models/posts/post';
import {
  getLayoutState,
  setIsSearchOpen,
} from '../../../../store/slices/layout-slice';
import FormikInput, { InputTypeEnum } from '../../../common/FormikInput';
import LoadingSpinner from '../../../common/LoadingSpinner';

export interface ISiteNavSearchProps {
  responsive: boolean;
  searchPlaceholderLabel: string;
}

const SiteNavSearch: FC<ISiteNavSearchProps> = ({
  responsive,
  searchPlaceholderLabel,
}) => {
  const { siteNav } = useSelector(getLayoutState);
  const { isSearchOpen } = siteNav;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useSearchDebounce(700);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IMiniPost[] | null>(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const closeSearchBtnRef = useRef<HTMLButtonElement>(null);

  useMemo(async () => {
    if (keyword) {
      try {
        setLoading(true);
        const result = await PostAgent.search(
          `?page=1&limit=10&keyword=${keyword}`
        );
        setPosts(result.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [keyword]);

  const searchWrapperResponsiveCss =
    'items-center flex justify-start flex-row bg-light mr-2 w-full relative transition-all ease-linear duration-200 rounded-lg';

  const searchWrapperNormalCss = `${
    isSearchOpen ? 'opacity-100' : 'opacity-0 w-0 px-0 overflow-hidden'
  } items-center flex justify-center flex-row mx-4 bg-light w-full relative transition-all ease-linear duration-200 rounded-lg`;

  const searchWrapperCss = responsive
    ? searchWrapperResponsiveCss
    : searchWrapperNormalCss;

  return (
    <>
      <Formik initialValues={{ search: '' }} onSubmit={(values) => {}}>
        {({ resetForm, handleChange }) => (
          <>
            <div
              className={`${
                isSearchOpen || searchFocus ? 'fixed' : 'hidden'
              } inset-0 bg-primary/30 cursor-pointer`}
              onClick={() => {
                setKeyword(null);
                dispatch(setIsSearchOpen(false));
                setPosts(null);
                setSearchFocus(false);
                resetForm();
              }}
            ></div>
            <Form className={searchWrapperCss}>
              <Field
                type={InputTypeEnum.text}
                name="search"
                autoComplete="off"
                placeholder={searchPlaceholderLabel}
                className={`rounded-lg w-full ${
                  responsive
                    ? 'pr-11 placeholder:text-sm text-sm h-8'
                    : 'h-11 pr-12'
                }`}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (e.target.value) {
                    setKeyword(e.target.value);
                  } else {
                    setKeyword(null);
                  }
                }}
                onFocus={() => setSearchFocus(true)}
                labelClassName="hidden"
                component={FormikInput}
              />
              {!responsive && (
                <button
                  ref={closeSearchBtnRef}
                  type="button"
                  className={`${
                    !isSearchOpen ? 'hidden' : ''
                  } absolute right-0 h-full text-center px-4 rounded-r-lg`}
                  onClick={() => {
                    setKeyword(null);
                    setSearchFocus(false);
                    dispatch(setIsSearchOpen(false));
                    setPosts(null);
                    setSearchFocus(false);
                    resetForm();
                  }}
                >
                  {!loading && (
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
                  )}
                  {loading && (
                    <LoadingSpinner className="w-5 h-5 text-primary" />
                  )}
                </button>
              )}
              {responsive && (
                <>
                  {!loading && !posts && (
                    <button
                      type="button"
                      className="absolute -right-1 h-full text-center px-4 rounded-r-lg text-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  {!loading && posts && (
                    <button
                      ref={closeSearchBtnRef}
                      type="button"
                      className="absolute -right-1 h-full text-center px-4 rounded-r-lg text-primary"
                      onClick={() => {
                        setKeyword(null);
                        setSearchFocus(false);
                        dispatch(setIsSearchOpen(false));
                        setPosts(null);
                        resetForm();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                  {loading && (
                    <button
                      type="button"
                      className="absolute -right-1 h-full text-center px-4 rounded-r-lg text-primary"
                    >
                      <LoadingSpinner className="w-4 h-4 text-primary" />
                    </button>
                  )}
                </>
              )}
              {posts && (
                <div className="absolute top-12 p-3 left-0 w-full max-h-[27rem] overflow-y-auto bg-light rounded-lg">
                  {posts &&
                    posts.length > 0 &&
                    posts.map((p, i) => (
                      <Fragment key={i}>
                        {p.type === PostTypeEnum.BLOG && (
                          <Link
                            href={`/blog/${p.slug}`}
                            className="text-xs text-zinc-700"
                            onClick={() => closeSearchBtnRef.current?.click()}
                          >
                            <div className="flex justify-start items-center hoverable:hover:bg-primary/20 p-2 w-full rounded-lg">
                              <div className="px-2 py-0.5 mr-1 bg-primary text-xs text-light rounded">
                                Article
                              </div>
                              <div className="truncate">{p.title}</div>
                            </div>
                          </Link>
                        )}
                        {p.type === PostTypeEnum.NEWS && (
                          <Link
                            href={`/news/${p.slug}`}
                            className="text-xs text-zinc-700"
                            onClick={() => closeSearchBtnRef.current?.click()}
                          >
                            <div className="flex justify-start items-center hoverable:hover:bg-primary/20 p-2 w-full rounded-lg truncate">
                              <div className="px-2 py-0.5 mr-1 bg-primary text-xs text-light rounded">
                                News
                              </div>
                              <div className="truncate">{p.title}</div>
                            </div>
                          </Link>
                        )}
                        {p.type === PostTypeEnum.PROJECT && (
                          <Link
                            href={`/portfolio/${p.slug}`}
                            className="text-xs text-zinc-700"
                            onClick={() => closeSearchBtnRef.current?.click()}
                          >
                            <div className="flex justify-start items-center hoverable:hover:bg-primary/20 p-2 w-full rounded-lg truncate">
                              <div className="px-2 py-0.5 mr-1 bg-primary text-xs text-light rounded">
                                Portfolio
                              </div>
                              <div className="truncate">{p.title}</div>
                            </div>
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  {posts && posts.length === 0 && (
                    <div className="w-full text-zinc-400">No Result</div>
                  )}
                </div>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SiteNavSearch;
