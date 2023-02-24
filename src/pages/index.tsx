import type { GetStaticProps, NextPage } from 'next';
import SiteLayout from '../components/site/layout/SiteLayout';
import HeroSection from '../components/site/sections/hero/HeroSection';
import ServicesSection from '../components/site/sections/services/ServicesSection';
import TestimonialsSection from '../components/site/sections/testimonials/TestimonialsSection';
import { CommentAgent } from '../lib/axios/agent';
import { IComment } from '../models/comments/comment';
import { getSiteLayout } from '../lib/helpers/get-layout';
import { ISiteLayout } from '../models/common/layout';

interface IProps extends ISiteLayout {
  projectsCommentsData: IComment[];
}

const HomePage: NextPage<IProps> = ({
  primaryMenuItems,
  secondaryMenuItems,
  siteName,
  siteDescription,
  siteURL,
  siteLogo,
  siteOverlayLogo,
  heroSectionData,
  serviceSectionData,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  projectsCommentsData,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={`${siteName} | ${siteDescription}`}
        pageDescription={siteDescription}
        pageKeywords={['development', 'coding', 'web', 'app', 'software']}
        og={{
          type: 'website',
          url: siteURL,
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
        container={false}
      >
        <HeroSection heroSectionData={heroSectionData} />
        <ServicesSection serviceSectionData={serviceSectionData} />
        {projectsCommentsData.length > 0 && (
          <TestimonialsSection projectsCommentsData={projectsCommentsData} />
        )}
      </SiteLayout>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  try {
    const siteLayout = await getSiteLayout();
    const projectsCommentsData =
      await CommentAgent.getProjectsSpecialComments();

    return {
      props: {
        ...siteLayout,
        projectsCommentsData,
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
