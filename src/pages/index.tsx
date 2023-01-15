import type { GetStaticProps, NextPage } from 'next';
import SiteLayout from '../components/site/layout/SiteLayout';
import BlogSection from '../components/site/sections/blog/BlogSection';
import ContactSection from '../components/site/sections/contact/ContactSection';
import HeroSection from '../components/site/sections/hero/HeroSection';
import HistorySection from '../components/site/sections/history/HistorySection';
import PortfolioSection from '../components/site/sections/portfolio/PortfolioSection';
import ServicesSection from '../components/site/sections/services/ServicesSection';
import TeamSection from '../components/site/sections/team/TeamSection';
import TestimonialsSection from '../components/site/sections/testimonials/TestimonialsSection';
import { FileAgent, TaxonomyAgent } from '../lib/axios/agent';
import { IFileSiteLogo, ILogoFile } from '../models/files/logo-file';
import { SettingsKeyEnum } from '../models/settings/settings';
import { ITaxonomy } from '../models/taxonomies/taxonomy';

interface IProps {
  primaryMenuItems: ITaxonomy[];
  secondaryMenuItems: ITaxonomy[];
  siteLogo?: ILogoFile;
  siteOverlayLogo?: ILogoFile;
}

const HomePage: NextPage<IProps> = ({
  primaryMenuItems,
  secondaryMenuItems,
  siteLogo,
  siteOverlayLogo,
}) => {
  return (
    <>
      <SiteLayout
        defaultMenuItemIndex={0}
        headerMenuItems={primaryMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
      >
        <HeroSection />
        <ServicesSection />
        <BlogSection />
        <PortfolioSection />
        <TeamSection />
        <HistorySection />
        <TestimonialsSection />
        <ContactSection />
      </SiteLayout>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const primaryMenuItems = await TaxonomyAgent.getPrimaryMenu();
  const secondaryMenuItems = await TaxonomyAgent.getSecondaryMenu();
  const siteLogos = await FileAgent.getSiteLogos();
  const siteLogo =
    siteLogos?.filter((l) => l.type === SettingsKeyEnum.SITE_LOGO_ID)[0]
      ?.file ?? undefined;
  const siteOverlayLogo =
    siteLogos?.filter((l) => l.type === SettingsKeyEnum.SITE_OVERLAY_LOGO_ID)[0]
      ?.file ?? undefined;

  return {
    props: {
      primaryMenuItems,
      secondaryMenuItems,
      siteLogo,
      siteOverlayLogo,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  };
};
