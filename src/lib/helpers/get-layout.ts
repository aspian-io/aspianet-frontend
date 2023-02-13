import { ISiteLayout } from "../../models/common/layout";
import { SettingsKeyEnum } from "../../models/settings/settings";
import { CommonAgent } from "../axios/agent";

export async function getSiteLayout (): Promise<ISiteLayout> {
  const {
    primaryMenuItems,
    secondaryMenuItems,
    siteLogos,
    heroSectionData,
    serviceSectionData,
    contactWidgetData,
    linksWidgetData,
    newsletterWidgetData,
  } = await CommonAgent.getLayoutData();

  const siteLogo =
    siteLogos?.filter( ( l ) => l.type === SettingsKeyEnum.SITE_LOGO_ID )[ 0 ]
      ?.file ?? undefined;
  const siteOverlayLogo =
    siteLogos?.filter(
      ( l ) => l.type === SettingsKeyEnum.SITE_OVERLAY_LOGO_ID
    )[ 0 ]?.file ?? undefined;

  return {
    primaryMenuItems,
    secondaryMenuItems,
    siteLogo,
    siteOverlayLogo,
    heroSectionData: heroSectionData[ 0 ],
    serviceSectionData,
    contactWidgetData: contactWidgetData[ 0 ],
    linksWidgetData: linksWidgetData[ 0 ],
    newsletterWidgetData: newsletterWidgetData[ 0 ],
  };
}