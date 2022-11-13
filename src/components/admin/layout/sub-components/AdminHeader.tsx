import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { AvatarSourceEnum, ClaimsEnum } from '../../../../models/auth/common';
import { AuthGuard } from '../../../common/AuthGuard';
import AdminSideBar from '../../sidebar-nav/AdminSideBar';

const AdminHeader = () => {
  const { data: session } = useSession();
  // const router = useRouter();
  // const pathName = router.pathname;
  // const pathNameParts = pathName.replace(/^\/|\/$/g, '').split('/');
  // const itemIsActive = (itemName: string) =>
  //   pathNameParts.length > 1 &&
  //   pathNameParts[1].toLowerCase() === itemName.toLowerCase();

  const getUserAvatarSrc = () => {
    if (session?.user.avatar) {
      return session?.user.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session?.user.avatar}`
        : session?.user.avatar;
    }
    return '';
  };

  const [activePosts, setActivePosts] = useState(false);
  const [activeMedia, setActiveMedia] = useState(false);
  const [activePages, setActivePages] = useState(false);
  const [activeNewsletter, setActiveNewsletter] = useState(false);
  const [activeAppearance, setActiveAppearance] = useState(false);
  const [activeUsers, setActiveUsers] = useState(false);

  return (
    <>
      <AdminSideBar
        logo={{
          src: '/nav-logo.svg',
          href: process.env.NEXT_PUBLIC_APP_BASE_URL!,
        }}
        username={session?.user.email ?? ''}
        userPhotoSrc={getUserAvatarSrc()}
        userFirstName={session?.user.firstName ?? ''}
        userLastName={session?.user.lastName ?? ''}
      >
        <AdminSideBar.Item
          itemIcon={
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
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          }
          itemTitle="Dashboard"
          itemHref="/admin"
        />
        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.POST_CREATE,
            ClaimsEnum.POST_DELETE,
            ClaimsEnum.POST_EDIT,
            ClaimsEnum.POST_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            }
            itemTitle="Posts"
            hasSubItems={true}
            activeItem={activePosts}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/posts"
                onActive={() => setActivePosts(true)}
              >
                All Posts
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
              <AdminSideBar.Item.SubItem
                href="/admin/posts/add-new"
                onActive={() => setActivePosts(true)}
              >
                Add New
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/categories"
                onActive={() => setActivePosts(true)}
              >
                Categories
              </AdminSideBar.Item.SubItem>
              <AdminSideBar.Item.SubItem
                href="/admin/tags"
                onActive={() => setActivePosts(true)}
              >
                Tags
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>

        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.FILE_CREATE,
            ClaimsEnum.FILE_DELETE,
            ClaimsEnum.FILE_EDIT,
            ClaimsEnum.FILE_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            }
            itemTitle="Media"
            hasSubItems={true}
            activeItem={activeMedia}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.FILE_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/media/library"
                onActive={() => setActiveMedia(true)}
              >
                Library
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.FILE_CREATE]}>
              <AdminSideBar.Item.SubItem
                href="/admin/media/add-new"
                onActive={() => setActiveMedia(true)}
              >
                Add New
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>

        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.POST_CREATE,
            ClaimsEnum.POST_DELETE,
            ClaimsEnum.POST_EDIT,
            ClaimsEnum.POST_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            }
            itemTitle="Pages"
            hasSubItems={true}
            activeItem={activePages}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/pages"
                onActive={() => setActivePages(true)}
              >
                All Pages
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
              <AdminSideBar.Item.SubItem
                href="/admin/pages/add-new"
                onActive={() => setActivePages(true)}
              >
                Add New
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>
        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.COMMENT_CREATE,
            ClaimsEnum.COMMENT_DELETE,
            ClaimsEnum.COMMENT_EDIT,
            ClaimsEnum.COMMENT_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            }
            itemTitle="Comments"
            itemHref="/admin/comments"
          />
        </AuthGuard>
        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.NEWSLETTER_CREATE,
            ClaimsEnum.NEWSLETTER_DELETE,
            ClaimsEnum.NEWSLETTER_EDIT,
            ClaimsEnum.NEWSLETTER_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
            }
            itemTitle="Newsletter"
            hasSubItems={true}
            activeItem={activeNewsletter}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/newsletter/all-campaigns"
                onActive={() => setActiveNewsletter(true)}
              >
                All Campaigns
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard
              claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_CREATE]}
            >
              <AdminSideBar.Item.SubItem
                href="/admin/newsletter/add-new-campaign"
                onActive={() => setActiveNewsletter(true)}
              >
                Add New Campaign
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/newsletter/subscribers"
                onActive={() => setActiveNewsletter(true)}
              >
                Subscribers
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>
        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.TAXONOMY_CREATE,
            ClaimsEnum.TAXONOMY_DELETE,
            ClaimsEnum.TAXONOMY_EDIT,
            ClaimsEnum.TAXONOMY_READ,
            ClaimsEnum.SETTING_READ,
            ClaimsEnum.SETTING_EDIT,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
            }
            itemTitle="Appearance"
            hasSubItems={true}
            activeItem={activeAppearance}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.SETTING_EDIT]}>
              <AdminSideBar.Item.SubItem
                href="/admin/appearance/personalization"
                onActive={() => setActiveAppearance(true)}
              >
                Personalization
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard
              claims={[
                ClaimsEnum.ADMIN,
                ClaimsEnum.SETTING_EDIT,
                ClaimsEnum.TAXONOMY_EDIT,
                ClaimsEnum.TAXONOMY_CREATE,
                ClaimsEnum.TAXONOMY_DELETE,
              ]}
            >
              <AdminSideBar.Item.SubItem
                href="/admin/appearance/widgets"
                onActive={() => setActiveAppearance(true)}
              >
                Widgets
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard
              claims={[
                ClaimsEnum.ADMIN,
                ClaimsEnum.TAXONOMY_EDIT,
                ClaimsEnum.TAXONOMY_CREATE,
                ClaimsEnum.TAXONOMY_DELETE,
              ]}
            >
              <AdminSideBar.Item.SubItem
                href="/admin/appearance/menus"
                onActive={() => setActiveAppearance(true)}
              >
                Menus
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>
        <AuthGuard
          claims={[
            ClaimsEnum.ADMIN,
            ClaimsEnum.USER_CREATE,
            ClaimsEnum.USER_DELETE,
            ClaimsEnum.USER_EDIT,
            ClaimsEnum.USER_READ,
          ]}
        >
          <AdminSideBar.Item
            itemIcon={
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            }
            itemTitle="Users"
            hasSubItems={true}
            activeItem={activeUsers}
          >
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_READ]}>
              <AdminSideBar.Item.SubItem
                href="/admin/users"
                onActive={() => setActiveUsers(true)}
              >
                All Users
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_CREATE]}>
              <AdminSideBar.Item.SubItem
                href="/admin/users/add-new"
                onActive={() => setActiveUsers(true)}
              >
                Add New
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
            <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.SETTING_EDIT]}>
              <AdminSideBar.Item.SubItem
                href="/admin/users/settings"
                onActive={() => setActiveUsers(true)}
              >
                Settings
              </AdminSideBar.Item.SubItem>
            </AuthGuard>
          </AdminSideBar.Item>
        </AuthGuard>
      </AdminSideBar>
    </>
  );
};

export default AdminHeader;
