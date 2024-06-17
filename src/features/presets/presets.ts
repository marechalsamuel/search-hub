import { Entry } from "../entry/entry.entity";
import { v4 as uuid } from "uuid";

export const getPresets = (): Entry[] => [
  {
    id: uuid(), // youtube,
    url: "https://www.youtube.com/results?search_query={{search}}",
  },
  {
    id: uuid(), // maps,
    url: "https://www.google.fr/maps/search/{{search}}",
    icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.fr/maps&size=24",
  },
  {
    id: uuid(), // wikipedia,
    url: "https://www.google.com/search?q=site:https://www.wikipedia.org {{search}}",
    icon: "https://www.google.com/s2/favicons?domain=www.wikipedia.org&sz=24",
  },
  {
    id: uuid(), // reddit,
    url: "https://www.google.com/search?q=site:https://www.reddit.com {{search}} reddit",
    icon: "https://www.google.com/s2/favicons?domain=www.reddit.com&sz=24",
  },
  {
    id: uuid(), // leboncoin,
    url: "https://www.leboncoin.fr/recherche?text={{search}}",
  },
  {
    id: uuid(), // twitter,
    url: "https://x.com/search?q={{search}}",
  },
  {
    id: uuid(), // gnews,
    url: "https://news.google.com/search?q={{search}}&hl=fr&gl=FR&ceid=FR%3Afr",
  },
];
