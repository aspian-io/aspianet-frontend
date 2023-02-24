import { IFile } from "../files/file";
import { ILogoFile } from "../files/logo-file";
import { IPost } from "../posts/post";
import { SettingsKeyEnum } from "../settings/settings";
import { ITaxonomy } from "../taxonomies/taxonomy";

export interface ILayout {
  primaryMenuItems: ITaxonomy[];
  secondaryMenuItems: ITaxonomy[];
  siteName: string;
  siteDescription: string;
  siteURL: string;
  siteLogos: {
    type: SettingsKeyEnum;
    file: IFile;
  }[];
  heroSectionData: IPost[];
  serviceSectionData: IPost[];
  contactWidgetData: IPost[];
  linksWidgetData: IPost[];
  newsletterWidgetData: IPost[];
}

export interface ISiteLayout {
  primaryMenuItems: ITaxonomy[];
  secondaryMenuItems: ITaxonomy[];
  siteName: string;
  siteDescription: string;
  siteURL: string;
  siteLogo?: ILogoFile;
  siteOverlayLogo?: ILogoFile;
  heroSectionData?: IPost;
  serviceSectionData: IPost[];
  contactWidgetData?: IPost;
  linksWidgetData?: IPost;
  newsletterWidgetData?: IPost;
}