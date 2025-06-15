import { NormalizedUserJourney } from "../types/normalizedUserJourney";
import { UserJourney } from "../types/userJourney";
import { Normalize } from "./normalizeSource";

export class Filter {

  static orderBySessionId(data: UserJourney[]): Record<string, UserJourney[]> {
    return data.reduce((acc, item) => {
      const sessionId = item.sessionId;
      if (!acc[sessionId]) acc[sessionId] = [];
      acc[sessionId].push(item);
      return acc;
    }, {} as Record<string, UserJourney[]>);
  }

  static orderJourney(data: UserJourney[]): Record<string, UserJourney[]> {
    const grouped = this.orderBySessionId(data);

    for (const sessionId in grouped) {
      const events = grouped[sessionId];

      events.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      if (events.length > 2) {
        const first: UserJourney = events[0];
        const last: UserJourney = events[events.length - 1];

        const normalizedFirst = Normalize.normalizeOrFallback(first.utm_source , first.utm_medium);
        const normalizedLast = Normalize.normalizeOrFallback(last.utm_source, last.utm_medium);

        (first as NormalizedUserJourney ).utm_source_normalized = normalizedFirst;
        (last as NormalizedUserJourney ).utm_source_normalized = normalizedLast;

        const seenSources = new Set<string>();
        seenSources.add(normalizedFirst);

        const middle = events.slice(1, events.length - 1).filter((e) => {
          const normalized = Normalize.normalizeOrFallback(e.utm_source, e.utm_medium);
          (e as NormalizedUserJourney ).utm_source_normalized = normalized;

          if (seenSources.has(normalized)) return false;

          seenSources.add(normalized);
          return true;
        });

        grouped[sessionId] = [first, ...middle, last];
      } else {
        grouped[sessionId] = events.map((e) => {
          (e as NormalizedUserJourney ).utm_source_normalized = Normalize.normalizeOrFallback(e.utm_source, e.utm_medium);
          return e;
        });
      }
    }

    return grouped;
  }
}
