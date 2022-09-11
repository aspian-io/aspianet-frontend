import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../common/Button';

const Profile = () => {
  const [bioSummary, setBioSummary] = useState(true);

  return (
    <div className="container mx-auto flex justify-between items-start py-8 bg-zinc-100 rounded-3xl mt-8">

      <div className="flex flex-col min-w-[270px] w-1/4 rounded-2xl py-10 px-8 bg-zinc-100">
        <div className="flex flex-col justify-center items-center ">
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-zinc-100">
            <Image
              src="/staff3.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Avatar"
            />
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
          <ul>
            <li className="flex items-center group h-14">
              <Link href="#">
                <a className="flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 group-focus-within:bg-primary group-focus-within:scale-110 transition-all duration-300">
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
                  <div className="pl-4 text-md text-zinc-600 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-300">
                    Profile
                  </div>
                </a>
              </Link>
            </li>
            <li className="flex items-center group h-14">
              <Link href="#">
                <a className="flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 group-focus-within:bg-primary group-focus-within:scale-110 transition-all duration-300">
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
                  <div className="pl-4 text-md text-zinc-600 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-300">
                    Privacy &amp; Security
                  </div>
                </a>
              </Link>
            </li>
            <li className="flex items-center group h-14">
              <Link href="#">
                <a className="flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 group-focus-within:bg-primary group-focus-within:scale-110 transition-all duration-300">
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
                  <div className="pl-4 text-md text-zinc-600 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-300">
                    Bookmarks
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-start w-3/4 min-h-[590px] h-full bg-light rounded-3xl p-8 mx-8">
        ss
      </div>
    </div>
  );
};

export default Profile;
