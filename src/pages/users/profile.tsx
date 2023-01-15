import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { AuthGuard } from '../../components/common/AuthGuard';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Profile from '../../components/site/users/profile/Profile';
import { FileAgent, TaxonomyAgent, UserAgent } from '../../lib/axios/agent';
import { ILogoFile } from '../../models/files/logo-file';
import { SettingsKeyEnum } from '../../models/settings/settings';
import { ITaxonomy } from '../../models/taxonomies/taxonomy';
import { authOptions } from '../api/auth/[...nextauth]';

interface IProps {
  isUpdateAvatarAllowed: boolean;
  primaryMenuItems: ITaxonomy[];
  secondaryMenuItems: ITaxonomy[];
  siteLogo?: ILogoFile;
  siteOverlayLogo?: ILogoFile;
}

const ProfilePage: NextPage<IProps> = ({
  isUpdateAvatarAllowed,
  primaryMenuItems,
  secondaryMenuItems,
  siteLogo,
  siteOverlayLogo,
}) => {
  return (
    <AuthGuard claims={[]}>
      <SiteLayout
        defaultMenuItemIndex={0}
        headerMenuItems={primaryMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
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
    const primaryMenuItems = await TaxonomyAgent.getPrimaryMenu();
    const secondaryMenuItems = await TaxonomyAgent.getSecondaryMenu();
    const siteLogos = await FileAgent.getSiteLogos();
    const siteLogo =
      siteLogos?.filter((l) => l.type === SettingsKeyEnum.SITE_LOGO_ID)[0]
        ?.file ?? undefined;
    const siteOverlayLogo =
      siteLogos?.filter(
        (l) => l.type === SettingsKeyEnum.SITE_OVERLAY_LOGO_ID
      )[0]?.file ?? undefined;

    try {
      const isUpdateAvatarAllowed = await UserAgent.isUpdateAvatarAllowed(
        session
      );

      return {
        props: {
          isUpdateAvatarAllowed,
          primaryMenuItems,
          secondaryMenuItems,
          siteLogo,
          siteOverlayLogo,
        },
      };
    } catch (error) {
      return {
        props: {
          isUpdateAvatarAllowed: false,
          primaryMenuItems,
          secondaryMenuItems,
          siteLogo,
          siteOverlayLogo,
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
