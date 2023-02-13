import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { AuthGuard } from '../../components/common/AuthGuard';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Profile from '../../components/site/users/profile/Profile';
import { FileAgent, TaxonomyAgent, UserAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { ISiteLayout } from '../../models/common/layout';
import { ILogoFile } from '../../models/files/logo-file';
import { SettingsKeyEnum } from '../../models/settings/settings';
import { ITaxonomy } from '../../models/taxonomies/taxonomy';
import { authOptions } from '../api/auth/[...nextauth]';

interface IProps extends ISiteLayout {
  isUpdateAvatarAllowed: boolean;
}

const ProfilePage: NextPage<IProps> = ({
  isUpdateAvatarAllowed,
  primaryMenuItems,
  secondaryMenuItems,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
}) => {
  return (
    <AuthGuard claims={[]}>
      <SiteLayout
        defaultMenuItemIndex={0}
        headerMenuItems={primaryMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
        siteFooterProps={{
          contactWidgetData,
          linksWidgetData,
          newsletterWidgetData,
        }}
      >
        <Profile isUpdateAvatarAllowed={isUpdateAvatarAllowed} />
      </SiteLayout>
    </AuthGuard>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    try {
      const siteLayout = await getSiteLayout();
      const isUpdateAvatarAllowed = await UserAgent.isUpdateAvatarAllowed(
        session
      );

      return {
        props: {
          isUpdateAvatarAllowed,
          ...siteLayout,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/auth/login',
    },
  };
};
