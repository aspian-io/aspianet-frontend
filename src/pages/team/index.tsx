import type { GetStaticProps, NextPage } from 'next';
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
  secondaryMenuItems,
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

export const getStaticProps: GetStaticProps<IProps> = async () => {
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
