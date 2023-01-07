import { AdminSettingsKeys } from "../../../../lib/swr/keys";
import { SettingsServiceEnum } from "../../../../models/settings/settings";

export const swrMenuSettingsKey = `${ AdminSettingsKeys.GET_ALL_SETTINGS }?settingService=${ SettingsServiceEnum.MENU }` as const;