import { UserJourney } from "./userJourney";

export type NormalizedUserJourney = UserJourney & {
  utm_source_normalized: string;
};