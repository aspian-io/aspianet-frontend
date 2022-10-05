import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../../common/Button';
import Input, { InputTypeEnum } from '../../../common/Input';
import BlogCard from '../../post/sub-components/BlogCard';
import Pagination from '../../post/sub-components/Pagination';
import ChangeAvatar from './sub-components/ChangeAvatar';
import ProfileAvatar from './sub-components/ProfileAvatar';

const Profile = () => {
  const [birthday, setBirthday] = useState<string | null>(null);
  const [birthdayInputType, setBirthdayInputType] = useState<InputTypeEnum>(
    InputTypeEnum.text
  );
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [bioSummary, setBioSummary] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'privacy' | 'bookmark'
  >('profile');
  

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start px-2 sm:px-8 lg:px-0 py-6 sm:py-8 bg-zinc-100 rounded-3xl my-4 lg:my-8">
      {/* Responsive menu starts */}
      <div className="flex flex-col sm:flex-row lg:hidden justify-between items-center w-full mb-1 sm:mb-4 px-6 sm:divide-x-2">
        <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:max-w-[25%] space-x-3 group">
          <div className="relative flex flex-col justify-center items-center mb-2 sm:mb-0">
            <ProfileAvatar responsive />
            <ChangeAvatar responsive />
          </div>
        </div>
        {/* Tabs Wrapper starts */}
        <div className="flex justify-center items-center w-full sm:w-3/4 space-x-2 sm:space-x-3 mt-2 sm:mt-0">
          {/* Profile starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('profile')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'profile' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Profile
                </div>
              </a>
            </Link>
          </div>
          {/* Privacy starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'privacy' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Security
                </div>
              </a>
            </Link>
          </div>
          {/* Bookmarks starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('bookmark')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'bookmark' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Bookmarks
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* Tabs Wrapper ends */}
      </div>
      {/* Responsive menu ends */}

      {/* lg menu starts */}
      <div className="hidden lg:flex flex-col min-w-[270px] lg:w-1/4 rounded-2xl py-10 px-8 bg-zinc-100">
        <div className="flex flex-col justify-center items-center">
          <div className="group">
            <ProfileAvatar />
          </div>
          <div className="mt-6 text-lg text-dark font-semibold">Hi Jane</div>
          <div className="text-center">
            <span
              className={`text-zinc-500 pt-2 ${
                bioSummary ? 'line-clamp-2' : ''
              }`}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
              officia repudiandae quos delectus, dolorum distinctio earum ipsa.
              Numquam repellendus voluptatibus rem cumque. Ullam, adipisci
              vitae? Tempora odio error animi eum?
            </span>
            <span>
              <Button
                rounded="rounded-lg"
                size="h-6"
                type="button"
                variant="link"
                extraCSSClasses="outline-primary"
                onClick={() => setBioSummary(!bioSummary)}
              >
                {bioSummary ? 'more' : 'less'}
              </Button>
            </span>
          </div>
        </div>
        <div className="py-8 px-4">
          <hr className="border-zinc-300" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'profile' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Profile
                </div>
              </a>
            </Link>
          </div>
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'privacy' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
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
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Security
                </div>
              </a>
            </Link>
          </div>
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('bookmark')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'bookmark' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
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
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Bookmarks
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* lg menu ends */}

      {/* Profile tab starts */}
      <div
        className={`${
          activeTab === 'profile'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
            Personal Info
          </h3>
          <Button
            rounded="rounded-xl"
            size="h-8"
            type="button"
            variant="success"
            extraCSSClasses=" text-xs sm:text-sm sm:px-4"
          >
            Save Changes
          </Button>
        </div>
        <div className="py-6 w-full">
          <hr className="border-zinc-200" />
        </div>
        <form className="flex flex-col justify-between items-center w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
            <Input
              placeholderText="Firstname*"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/2 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Lastname*"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/2 text-xs sm:text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
            <select
              name="gender"
              className={`text-xs sm:text-sm h-10 bg-zinc-100 border-0 rounded-xl w-full sm:w-1/2 ${
                !!gender ? 'text-dark' : 'text-zinc-400'
              } focus:text-dark focus:border-2 focus:border-primary focus:bg-light`}
              defaultValue="default"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="default" disabled>
                Gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <Input
              placeholderText="Birthday"
              rounded="rounded-xl"
              size="h-10"
              type={birthdayInputType}
              onFocus={(e) => setBirthdayInputType(InputTypeEnum.date)}
              onBlur={(e) =>
                birthday
                  ? setBirthdayInputType(InputTypeEnum.date)
                  : setBirthdayInputType(InputTypeEnum.text)
              }
              onChange={(e) => setBirthday(e.target.value)}
              extraCSSClasses={`w-full sm:w-1/2 text-xs sm:text-sm ${
                birthday ? 'date-input--has-value' : 'date-input'
              }`}
            />
          </div>
          <textarea
            minLength={5}
            maxLength={500}
            className="mt-4 border-0 rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm focus:border-2 focus:border-primary focus:bg-light"
            placeholder="Biography..."
          ></textarea>
          <div className="flex justify-between items-center w-full mt-10">
            <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
              Contact Info
            </h3>
          </div>
          <div className="py-6 w-full">
            <hr className="border-zinc-200" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
            <Input
              placeholderText="Country"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="State"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="City"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
          </div>
          <Input
            placeholderText="Address"
            rounded="rounded-xl"
            size="h-10"
            type={InputTypeEnum.text}
            extraCSSClasses="w-full text-xs sm:text-sm mt-4"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center w-full  space-y-3 sm:space-x-6 sm:space-y-0 mt-4">
            <Input
              placeholderText="Postal Code"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.text}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Phone"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.tel}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Cell Phone"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.tel}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
          </div>
          <div className="flex justify-between items-center w-full mt-10">
            <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
              Social Network Info
            </h3>
          </div>
          <div className="py-6 w-full">
            <hr className="border-zinc-200" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
            <Input
              placeholderText="Website"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Facebook"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Instagram"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-4">
            <Input
              placeholderText="Twitter"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Linkedin"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
            <Input
              placeholderText="Pinterest"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.url}
              extraCSSClasses="w-full sm:w-1/3 text-xs sm:text-sm"
            />
          </div>
        </form>
      </div>
      {/* Profile tab ends */}

      {/* Security tab starts */}
      <div
        className={`${
          activeTab === 'privacy'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
            Change Password
          </h3>
          <Button
            rounded="rounded-xl"
            size="h-8"
            type="button"
            variant="success"
            extraCSSClasses="text-xs sm:text-sm px-2 sm:px-4"
          >
            Save Changes
          </Button>
        </div>
        <div className="py-6 w-full">
          <hr className="border-zinc-200" />
        </div>
        <form className="flex justify-between items-center w-full">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
            <Input
              placeholderText="Current Password*"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.password}
              extraCSSClasses="w-full text-xs sm:w-1/2 sm:text-sm"
            />
            <Input
              placeholderText="New Password*"
              rounded="rounded-xl"
              size="h-10"
              type={InputTypeEnum.password}
              extraCSSClasses="w-full text-xs sm:w-1/2 sm:text-sm"
            />
          </div>
        </form>
      </div>
      {/* Security tab ends */}

      {/* Bookmarks tab starts */}
      <div
        className={`${
          activeTab === 'bookmark'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1 before:-left-3">
            Bookmarks
          </h3>
        </div>
        <div className="py-6 w-full">
          <hr className="border-zinc-200" />
        </div>
        <div className="flex flex-wrap justify-center items-center w-full gap-6 transition-all duration-500">
          <div className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500">
            <BlogCard
              featuredImageUrl="/blog-1.jpg"
              authorName="Admin"
              commentsNum={12}
              likesNum={15}
              bookmarksNum={3}
              title="New CSS properties you should know"
              excerpt="Lorem ipsum dolor sit amet, consec adipiscing elit. Ut et massa mi. Aliqu in hendrerit urna. Pellentesque sit a sapien fringilla, mattis ligula. Aliqu i hendrerit urna..."
              postUrl="#"
            />
          </div>
          <div className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500">
            <BlogCard
              featuredImageUrl="/blog-1.jpg"
              authorName="Admin"
              commentsNum={12}
              likesNum={15}
              bookmarksNum={3}
              title="New CSS properties you should know"
              excerpt="Lorem ipsum dolor sit amet, consec adipiscing elit. Ut et massa mi. Aliqu in hendrerit urna. Pellentesque sit a sapien fringilla, mattis ligula. Aliqu i hendrerit urna..."
              postUrl="#"
            />
          </div>
          <div className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500">
            <BlogCard
              featuredImageUrl="/blog-1.jpg"
              authorName="Admin"
              commentsNum={12}
              likesNum={15}
              bookmarksNum={3}
              title="New CSS properties you should know"
              excerpt="Lorem ipsum dolor sit amet, consec adipiscing elit. Ut et massa mi. Aliqu in hendrerit urna. Pellentesque sit a sapien fringilla, mattis ligula. Aliqu i hendrerit urna..."
              postUrl="#"
            />
          </div>
          <div className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500">
            <BlogCard
              featuredImageUrl="/blog-1.jpg"
              authorName="Admin"
              commentsNum={12}
              likesNum={15}
              bookmarksNum={3}
              title="New CSS properties you should know"
              excerpt="Lorem ipsum dolor sit amet, consec adipiscing elit. Ut et massa mi. Aliqu in hendrerit urna. Pellentesque sit a sapien fringilla, mattis ligula. Aliqu i hendrerit urna..."
              postUrl="#"
            />
          </div>
          <div className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500">
            <BlogCard
              featuredImageUrl="/blog-1.jpg"
              authorName="Admin"
              commentsNum={12}
              likesNum={15}
              bookmarksNum={3}
              title="New CSS properties you should know"
              excerpt="Lorem ipsum dolor sit amet, consec adipiscing elit. Ut et massa mi. Aliqu in hendrerit urna. Pellentesque sit a sapien fringilla, mattis ligula. Aliqu i hendrerit urna..."
              postUrl="#"
            />
          </div>
        </div>
        <div className="flex justify-center items center w-full mt-12">
          <Pagination
            currentPage={3}
            totalPages={97}
            baseUrl="localhost:3000/profile/bookmarks"
          />
        </div>
      </div>
      {/* Bookmarks tab ends */}
    </div>
  );
};

export default Profile;
