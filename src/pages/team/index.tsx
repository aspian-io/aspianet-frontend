import type { GetServerSideProps, NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Team from '../../components/site/team/Team';
import { UserAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { ISiteLayout } from '../../models/common/layout';
import { IMinimalUser } from '../../models/users/minimal-user';

interface IProps extends ISiteLayout {
  members: IMinimalUser[];
}

const TeamPage: NextPage<IProps> = ({
  primaryMenuItems,
  siteName,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  members,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={`${siteName} | Our Team`}
        pageDescription={'List of our team members'}
        og={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/team`,
          image: siteLogo?.key
        }}
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
        <Team members={members} />
      </SiteLayout>
    </>
  );
};

export default TeamPage;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const siteLayout = await getSiteLayout();
    const members = await UserAgent.membersList();

    return {
      props: {
        ...siteLayout,
        members,
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
};
