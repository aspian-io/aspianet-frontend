import { ISiteLayout } from "../../models/common/layout";
import { SettingsKeyEnum } from "../../models/settings/settings";
import { CommonAgent } from "../axios/agent";

export async function getSiteLayout (): Promise<ISiteLayout> {
  const {
    primaryMenuItems,
    secondaryMenuItems,
    siteName,
    siteDescription,
    siteURL,
    siteLogos,
    heroSectionData,
    serviceSectionData,
    contactWidgetData,
    linksWidgetData,
    newsletterWidgetData,
  } = await CommonAgent.getLayoutData();

  const siteLogo =
    siteLogos?.filter( ( l ) => l.type === SettingsKeyEnum.SITE_LOGO_ID )[ 0 ]
      ?.file ?? null;
  const siteOverlayLogo =
    siteLogos?.filter(
      ( l ) => l.type === SettingsKeyEnum.SITE_OVERLAY_LOGO_ID
    )[ 0 ]?.file ?? null;

  return {
    primaryMenuItems,
    secondaryMenuItems,
    siteName,
    siteDescription,
    siteURL,
    siteLogo,
    siteOverlayLogo,
    heroSectionData: heroSectionData[ 0 ] ?? null,
    serviceSectionData,
    contactWidgetData: contactWidgetData[ 0 ] ?? null,
    linksWidgetData: linksWidgetData[ 0 ] ?? null,
    newsletterWidgetData: newsletterWidgetData[ 0 ] ?? null,
  };
}