import { SettingsKeyEnum } from "../settings/settings";

export interface ILogoFile {
  key: string;
  filename: string;
  imageAlt: string | null;
}

export interface IFileSiteLogo {
  type: SettingsKeyEnum;
  file: ILogoFile;
}

